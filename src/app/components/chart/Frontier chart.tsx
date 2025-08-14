"use client";

import React from "react";
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

type Pt = { x: number; noSF: number; withSF: number };

const rf = 0.035;

// Volatility (x) points
const vol = [
  0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15,
  0.16, 0.18, 0.20, 0.22, 0.24, 0.26, 0.28, 0.30, 0.32, 0.34,
  0.36, 0.38, 0.40, 0.42, 0.44, 0.46, 0.48, 0.50, 0.52, 0.54,
  0.56, 0.58, 0.60,
];

// Frontier (No SF)
const retNoSF = [
  0.060, 0.072, 0.084, 0.095, 0.105, 0.112, 0.118, 0.125, 0.133, 0.142,
  0.151, 0.158, 0.160, 0.167, 0.173, 0.179, 0.186, 0.192, 0.199, 0.206,
  0.212, 0.215, 0.217, 0.221, 0.235, 0.242, 0.248, 0.253, 0.257, 0.260,
  0.263, 0.266, 0.268,
];

// Frontier (With SF) – slightly higher than No SF
const retSF = retNoSF.map((y, i) =>
  y +
  [
    0.0, 0.0, 0.005, 0.007, 0.010, 0.012, 0.013, 0.014, 0.014, 0.014, 0.014,
    0.015, 0.016, 0.017, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018,
    0.018, 0.018, 0.018, 0.010, 0.010, 0.010, 0.010, 0.010, 0.010, 0.010,
    0.010, 0.010,
  ][i]
);

// Build chart rows
const data: Pt[] = vol.map((x, i) => ({ x, noSF: retNoSF[i], withSF: retSF[i] }));

// Tangency points (approx from your ref)
const tangencyNoSF = { x: 0.13, y: 0.122 };
const tangencySF = { x: 0.045, y: 0.108 };

// Capital Allocation Line through (0, rf) and tangency, drawn to xEnd
function calSegment(tangency: { x: number; y: number }, xEnd: number) {
  const slope = (tangency.y - rf) / tangency.x;
  const yEnd = rf + slope * xEnd;
  return [
    { x: 0, y: rf },
    { x: xEnd, y: yEnd },
  ] as const;
}

const calNoSF = calSegment(tangencyNoSF, 0.40);
const calSF = calSegment(tangencySF, 0.15);

const pct = (v: number) => `${(v * 100).toFixed(0)}%`;
const fmt = (v: number) => v.toFixed(3);

export default function FrontiersCalChart(): JSX.Element {
  return (
    <div
      style={{
        width: 925,           // requested resolution width
        height: 400,          // requested resolution height
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
          <ReferenceDot x={tangencyNoSF.x} y={tangencyNoSF.y} r={6} isFront label="Tangency (No SF)" />
          <ReferenceDot x={tangencySF.x} y={tangencySF.y} r={6} isFront label="Tangency (With SF)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
