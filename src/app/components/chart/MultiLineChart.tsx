"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MultiLineChart() {
  const data = [
    { date: "Jul '20", stability: 10000, sp500: 10000, bonds: 10000, commodities: 10000, gold: 10000 },
    { date: "Jan '21", stability: 10500, sp500: 15000, bonds: 9500, commodities: 14500, gold: 12000 },
    { date: "Jul '21", stability: 11000, sp500: 15500, bonds: 9400, commodities: 14800, gold: 12500 },
    { date: "Jan '22", stability: 11500, sp500: 14000, bonds: 9300, commodities: 16000, gold: 13000 },
    { date: "Jul '22", stability: 12000, sp500: 14500, bonds: 9200, commodities: 17000, gold: 13500 },
    { date: "Jan '23", stability: 12500, sp500: 16000, bonds: 9100, commodities: 15000, gold: 14000 },
    { date: "Jul '23", stability: 13000, sp500: 16500, bonds: 9000, commodities: 16500, gold: 14500 },
    { date: "Jan '24", stability: 13500, sp500: 17000, bonds: 8900, commodities: 18000, gold: 15000 },
    { date: "Jul '24", stability: 14000, sp500: 18500, bonds: 8800, commodities: 17500, gold: 16000 },
    { date: "Apr '25", stability: 14500, sp500: 21000, bonds: 8700, commodities: 15500, gold: 17000 },
  ];

  return (
    <div style={{ width: "100%", height: 500, background: "#0d1b2a", padding: "1rem", borderRadius: "12px" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#1b263b" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" tickFormatter={(val) => `$${val / 1000}k`} />
          <Tooltip contentStyle={{ background: "#1b263b", border: "none" }} labelStyle={{ color: "#fff" }} />
          <Legend wrapperStyle={{ color: "#fff" }} />
          
          <Line type="monotone" dataKey="stability" stroke="#2ec4b6" name="Stability Fund" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="sp500" stroke="#3a86ff" name="S&P 500" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="bonds" stroke="#9d4edd" name="Aggregate Bonds" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="commodities" stroke="#ff6b6b" name="Commodities" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="gold" stroke="#ffd60a" name="Gold" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
