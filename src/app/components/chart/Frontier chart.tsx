"use client";

import React, { useEffect, useState } from "react";
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
import * as d3 from "d3"; // for CSV parsing

type Pt = { x: number; noSF?: number; withSF?: number };

const rf = 0.035;

function FrontiersCalChart() {
  const [data, setData] = useState<Pt[]>([]);

  useEffect(() => {
    d3.csv("/data/frontier.csv", d3.autoType).then((rows) => {
      // Separate curves
      const noSF = rows.filter((r) => r.Curve === "Frontier_No_SF");
      const withSF = rows.filter((r) => r.Curve === "Frontier_With_SF");

      // Merge into unified rows by volatility
      const merged: Pt[] = noSF.map((row, i) => ({
        x: row.Volatility,
        noSF: row.Return,
        withSF: withSF[i] ? withSF[i].Return : undefined,
      }));

      setData(merged);
    });
  }, []);

  // Example tangency points (replace with actual logic if needed)
  const tangencyNoSF = { x: 0.13, y: 0.122 };
  const tangencySF = { x: 0.045, y: 0.108 };

  const calSegment = (tangency: { x: number; y: number }, xEnd: number) => {
    const slope = (tangency.y - rf) / tangency.x;
    const yEnd = rf + slope * xEnd;
    return [
      { x: 0, y: rf },
      { x: xEnd, y: yEnd },
    ] as const;
  };

  const calNoSF = calSegment(tangencyNoSF, 0.40);
  const calSF = calSegment(tangencySF, 0.15);

  const pct = (v: number) => `${(v * 100).toFixed(0)}%`;
  const fmt = (v: number) => v.toFixed(3);

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
        Frontiers + Extended CAL (rf=3.50%)
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 8, right: 24, left: 8, bottom: 16 }}>
          <CartesianGrid strokeOpacity={0.3} />
          <XAxis
            dataKey="x"
            tickFormatter={pct}
            label={{ value: "Volatility (Std Dev)", position: "insideBottom", offset: -8 }}
          />
          <YAxis
            domain={[0.03, 0.30]}
            tickFormatter={pct}
            label={{ value: "Expected Return", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value: number) => fmt(value)}
            labelFormatter={(label: number) => `Volatility: ${pct(label)}`}
          />
          <Legend verticalAlign="bottom" align="right" />

          {/* Efficient Frontiers */}
          <Line
            type="monotone"
            dataKey="noSF"
            name="Frontier (No SF)"
            dot={{ r: 3 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="withSF"
            name="Frontier (With SF)"
            dot={{ r: 3 }}
            strokeWidth={2}
          />

          {/* CAL (dashed) */}
          <ReferenceLine
            segment={calNoSF}
            strokeDasharray="6 6"
            label="CAL Extended (No SF)"
          />
          <ReferenceLine
            segment={calSF}
            strokeDasharray="6 6"
            label="CAL Extended (With SF)"
          />

          {/* Tangency markers */}
          <ReferenceDot x={tangencyNoSF.x} y={tangencyNoSF.y} r={6} label="Tangency (No SF)" />
          <ReferenceDot x={tangencySF.x} y={tangencySF.y} r={6} label="Tangency (With SF)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FrontiersCalChart;
