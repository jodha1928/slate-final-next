"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
} from "recharts";
import * as d3 from "d3"; // npm i d3

type Row = { Curve: string; Volatility: number; Return: number };
type Pt = { x: number; noSF?: number; withSF?: number };

const RF = 0.035; // 3.5%

const pct = (v: number) => `${(v * 100).toFixed(0)}%`;
const fmt = (v: number) => v.toFixed(3);

/** Build union-by-x rows so lines share the same X axis correctly */
function mergeByX(noSF: Row[], withSF: Row[]): Pt[] {
  const map = new Map<string, Pt>();
  const key = (x: number) => x.toFixed(6); // stabilize float keys

  for (const r of noSF) {
    const k = key(r.Volatility);
    const obj = map.get(k) ?? { x: r.Volatility };
    obj.noSF = r.Return;
    map.set(k, obj);
  }
  for (const r of withSF) {
    const k = key(r.Volatility);
    const obj = map.get(k) ?? { x: r.Volatility };
    obj.withSF = r.Return;
    map.set(k, obj);
  }
  return Array.from(map.values()).sort((a, b) => a.x - b.x);
}

/** Max Sharpe tangency from a curve */
function tangency(rows: Row[]) {
  if (rows.length === 0) return { x: 0, y: RF, sharpe: 0 };
  let best = rows[0];
  let bestSR = (best.Return - RF) / best.Volatility;
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const sr = (r.Return - RF) / r.Volatility;
    if (sr > bestSR) {
      best = r;
      bestSR = sr;
    }
  }
  return { x: best.Volatility, y: best.Return, sharpe: bestSR };
}

/** CAL from (0, RF) to xEnd using tangency slope */
function calSegment(tan: { x: number; y: number }, xEnd: number) {
  const slope = (tan.y - RF) / tan.x;
  const yEnd = RF + slope * xEnd;
  return [
    { x: 0, y: RF },
    { x: xEnd, y: yEnd },
  ] as const;
}

export default function FrontiersCalChart() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    d3.csv("/data/frontier.csv", d3.autoType).then((r) => {
      // ensure numeric
      const cast = (r as unknown as Row[]).map((d) => ({
        Curve: String(d.Curve),
        Volatility: +d.Volatility,
        Return: +d.Return,
      }));
      setRows(cast);
    });
  }, []);

  const {
    data,
    noSF,
    withSF,
    tanNoSF,
    tanWithSF,
    calNoSF,
    calWithSF,
    xMax,
    yMin,
    yMax,
  } = useMemo(() => {
    const empty = {
      data: [] as Pt[],
      noSF: [] as Row[],
      withSF: [] as Row[],
      tanNoSF: { x: 0, y: RF, sharpe: 0 },
      tanWithSF: { x: 0, y: RF, sharpe: 0 },
      calNoSF: [{ x: 0, y: RF }, { x: 0, y: RF }] as const,
      calWithSF: [{ x: 0, y: RF }, { x: 0, y: RF }] as const,
      xMax: 0.6,
      yMin: RF,
      yMax: 0.30,
    };
    if (!rows) return empty;

    const noSF = rows.filter((r) => r.Curve === "Frontier_No_SF").sort((a, b) => a.Volatility - b.Volatility);
    const withSF = rows.filter((r) => r.Curve === "Frontier_With_SF").sort((a, b) => a.Volatility - b.Volatility);

    const data = mergeByX(noSF, withSF);

    // tangencies via max Sharpe
    const tanNoSF = tangency(noSF);
    const tanWithSF = tangency(withSF);

    // axis domains inclusive of CAL ends
    const xMaxData = Math.max(
      data.length ? data[data.length - 1].x : 0.6,
      tanNoSF.x * 3,
      tanWithSF.x * 3
    );
    const xMax = Math.min(0.6, Math.max(0.2, xMaxData)); // cap like your ref

    const calNoSF = calSegment({ x: tanNoSF.x, y: tanNoSF.y }, Math.min(xMax, tanNoSF.x * 3));
    const calWithSF = calSegment({ x: tanWithSF.x, y: tanWithSF.y }, Math.min(xMax, tanWithSF.x * 3));

    const allY = [
      RF,
      ...noSF.map((r) => r.Return),
      ...withSF.map((r) => r.Return),
      calNoSF[1].y,
      calWithSF[1].y,
    ];
    const yMin = Math.min(...allY) - 0.005;
    const yMax = Math.max(...allY) + 0.01;

    return { data, noSF, withSF, tanNoSF, tanWithSF, calNoSF, calWithSF, xMax, yMin, yMax };
  }, [rows]);

  if (!rows) {
    return <div style={{ width: 925, height: 400, display: "grid", placeItems: "center" }}>Loading…</div>;
  }

  return (
    <div
      style={{
        width: 925,
        height: 400,
        background: "#fff",
        padding: 12,
        borderRadius: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        Frontiers + Extended CAL (x3.0, rf=3.50%)
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 8, right: 24, left: 8, bottom: 16 }}>
          <CartesianGrid strokeOpacity={0.3} />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, xMax]}
            tickFormatter={pct}
            label={{ value: "Volatility (Std Dev)", position: "insideBottom", offset: -8 }}
          />
          <YAxis
            type="number"
            domain={[yMin, yMax]}
            tickFormatter={pct}
            label={{ value: "Expected Return", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [fmt(value), name]}
            labelFormatter={(label: number) => `Volatility: ${pct(label)}`}
          />
          <Legend verticalAlign="bottom" align="right" />

          {/* Efficient Frontiers (union-by-x) */}
          <Line
            type="monotone"
            dataKey="noSF"
            name="Frontier (No SF)"
            dot={{ r: 3 }}
            strokeWidth={2}
            isAnimationActive={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="withSF"
            name="Frontier (With SF)"
            dot={{ r: 3 }}
            strokeWidth={2}
            isAnimationActive={false}
            connectNulls
          />

          {/* CALs (dashed) */}
          <ReferenceLine
            segment={calNoSF}
            strokeDasharray="6 6"
            label="CAL Extended (No SF)"
          />
          <ReferenceLine
            segment={calWithSF}
            strokeDasharray="6 6"
            label="CAL Extended (With SF)"
          />

          {/* Tangency markers from CSV (max Sharpe) */}
          <ReferenceDot x={tanNoSF.x} y={tanNoSF.y} r={6} label="Tangency (No SF)" />
          <ReferenceDot x={tanWithSF.x} y={tanWithSF.y} r={6} label="Tangency (With SF)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
