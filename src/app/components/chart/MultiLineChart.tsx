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
    { date: "Jul '15", stability: 10000, sp500: 1000, bonds: 10000, commodities: 10000, gold: 10000 },
    { date: "Jan '16", stability: 10500, sp500: 5000, bonds: 9500, commodities: 14500, gold: 12000 },
    { date: "Jul '17", stability: 9000, sp500: 5500, bonds: 9400, commodities: 14800, gold: 12500 },
    { date: "Jan '18", stability: 9500, sp500: 4000, bonds: 9300, commodities: 16000, gold: 13000 },
    { date: "Jul '19", stability: 10000, sp500: 14500, bonds: 9200, commodities: 17000, gold: 13500 },
    { date: "Jan '20", stability: 9500, sp500: 6000, bonds: 9100, commodities: 15000, gold: 14000 },
    { date: "Jul '21", stability: 9000, sp500: 500, bonds: 9000, commodities: 16500, gold: 14500 },
    { date: "Jan '22", stability: 8500, sp500: 17000, bonds: 1900, commodities: 18000, gold: 15000 },
    { date: "Jul '23", stability: 14000, sp500: 18500, bonds: 8800, commodities: 17500, gold: 16000 },
    { date: "Apr '24", stability: 14500, sp500: 21000, bonds: 8700, commodities: 15500, gold: 17000 },
    { date: "Jul '25", stability: 15000, sp500: 10000, bonds: 10000, commodities: 10000, gold: 10000 },
    { date: "Jan '26", stability: 15500, sp500: 15000, bonds: 9500, commodities: 14500, gold: 12000 },
    { date: "Jul '27", stability: 16000, sp500: 15500, bonds: 9400, commodities: 14800, gold: 12500 },
    { date: "Jan '28", stability: 16500, sp500: 14000, bonds: 9300, commodities: 16000, gold: 13000 },
    { date: "Jul '29", stability: 17000, sp500: 14500, bonds: 9200, commodities: 17000, gold: 13500 },
    { date: "Jan '30", stability: 17500, sp500: 16000, bonds: 9100, commodities: 15000, gold: 14000 },
    { date: "Jul '31", stability: 18000, sp500: 16500, bonds: 9000, commodities: 16500, gold: 14500 },
    { date: "Jan '32", stability: 18500, sp500: 17000, bonds: 8900, commodities: 18000, gold: 15000 },
    { date: "Jul '33", stability: 19000, sp500: 18500, bonds: 8800, commodities: 17500, gold: 16000 },
    { date: "Apr '34", stability: 19500, sp500: 21000, bonds: 8700, commodities: 15500, gold: 17000 },
  ];

  return (
    <div style={{ width: "100%", height: 500, background: "#fff", padding: "1rem", borderRadius: "12px" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#1b263b" />
          <YAxis stroke="#1b263b" tickFormatter={(val) => `$${val / 1000}k`} />
          <Tooltip contentStyle={{ background: "#fff", border: "none" }} labelStyle={{ color: "#1b263b" }} />
          <Legend wrapperStyle={{ color: "#1b263b" }} />
          
          <Line type="linear" dataKey="stability" stroke="#2ec4b6" name="Stability Fund" strokeWidth={2} dot={false} />
          <Line type="linear" dataKey="sp500" stroke="#3a86ff" name="S&P 500" strokeWidth={2} dot={false} />
          <Line type="linear" dataKey="bonds" stroke="#9d4edd" name="Aggregate Bonds" strokeWidth={2} dot={false} />
          <Line type="linear" dataKey="commodities" stroke="#ff6b6b" name="Commodities" strokeWidth={2} dot={false} />
          <Line type="linear" dataKey="gold" stroke="#ffd60a" name="Gold" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
