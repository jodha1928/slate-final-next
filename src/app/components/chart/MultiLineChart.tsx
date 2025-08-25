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
import { useEffect, useState } from "react";
import * as d3 from "d3"; // for CSV + cumulative calc

export default function MultiLineChart({ includeCrypto = false }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("/data/returns.csv").then((raw: Array<Record<string, string>>) => {
      let initialValue = 10000;
      const parseDate = d3.timeParse("%d/%m/%Y");

      let cumulative = {
        StabilityFund: initialValue,
        SP500: initialValue,
        "Aggregate Bonds": initialValue,
        Commodities: initialValue,
        Gold: initialValue,
        Bitcoin: initialValue,
        Ethereum: initialValue,
      };

      const processed = raw
        .map((d) => {
          const date = parseDate(d["Date"]);
          if (!date) return null;

          cumulative.StabilityFund *= 1 + +d["Alternative SF Returns"];
          cumulative.SP500 *= 1 + +d["SPY"];
          cumulative["Aggregate Bonds"] *= 1 + +d["Aggregate Bonds"];
          cumulative.Commodities *= 1 + +d["Commodities"];
          cumulative.Gold *= 1 + +d["Gold"];
          cumulative.Bitcoin *= 1 + +d["Bitcoin"];
          cumulative.Ethereum *= 1 + +d["Ethereum"];

          return {
            date: d3.timeFormat("%b '%y")(date),
            stability: +cumulative.StabilityFund,
            sp500: +cumulative.SP500,
            bonds: +cumulative["Aggregate Bonds"],
            commodities: +cumulative.Commodities,
            gold: +cumulative.Gold,
            bitcoin: +cumulative.Bitcoin,
            ethereum: +cumulative.Ethereum,
          };
        })
        .filter(Boolean);

      setData(processed);
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        background: "#fff",
        borderRadius: "12px",
      }}
    >
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#1b263b" />
          <YAxis
            stroke="#1b263b"
            tickFormatter={(val) => `$${val / 1000}k`}
          />
          <Tooltip
            contentStyle={{ background: "#fff", border: "none" }}
            labelStyle={{ color: "#1b263b" }}
            formatter={(val) => `$${Number(val).toFixed(0)}`}
          />
          <Legend wrapperStyle={{ color: "#1b263b" }} />

          <Line
            type="linear"
            dataKey="stability"
            stroke="#2ec4b6"
            name="Stability Fund"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="linear"
            dataKey="sp500"
            stroke="#3a86ff"
            name="S&P 500"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="linear"
            dataKey="bonds"
            stroke="#9d4edd"
            name="Aggregate Bonds"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="linear"
            dataKey="commodities"
            stroke="#ff6b6b"
            name="Commodities"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="linear"
            dataKey="gold"
            stroke="#ffd60a"
            name="Gold"
            strokeWidth={2}
            dot={false}
          />
          {includeCrypto && (
            <>
              <Line
                type="linear"
                dataKey="bitcoin"
                stroke="#f7931a"
                name="Bitcoin"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="linear"
                dataKey="ethereum"
                stroke="#8c8c8c"
                name="Ethereum"
                strokeWidth={2}
                dot={false}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}