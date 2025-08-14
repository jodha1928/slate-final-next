import React from "react";

/**
 * OptimalAllocationTable — elevated clarity, NO heading.
 * - Right-aligned numeric columns with tabular figures
 * - Subtle green/red tints for positive/negative values
 * - Sticky first column
 * - Zebra banding
 * - Stability Fund highlighted; Return/Volatility grouped with a top rule
 * - IBM Plex via @import (safe everywhere)
 */

export type AllocationRow = { asset: string; cols: (string | number)[] };
export type AllocationTableProps = {
  headers?: string[];   // first must be "Asset"
  rows?: AllocationRow[];
  width?: number | string;
  height?: number | string;
};

const defaultHeaders = [
  "Asset",
  "Unlevered\n(No SF)",
  "Unlevered\n(With SF)",
  "Leveraged\n(No SF)",
  "Leveraged\n(With SF)",
];

const defaultRows: AllocationRow[] = [
  { asset: "Aggregate Bonds", cols: ["46.00%", "0.00%", "16.20%", "1.04%"] },
  { asset: "Bitcoin", cols: ["3.91%", "13.28%", "5.10%", "5.36%"] },
  { asset: "Commodities", cols: ["30.47%", "18.27%", "31.34%", "16.46%"] },
  { asset: "Risk Free Asset", cols: ["0.00%", "0.00%", "25.45%", "-107.34%"] },
  { asset: "Stability Fund", cols: ["0.00%", "59.52%", "0.00%", "176.65%"] },
  { asset: "S&P 500", cols: ["19.63%", "8.94%", "21.92%", "7.82%"] },
  { asset: "__divider__", cols: ["", "", "", ""] },
  { asset: "Return", cols: ["9.88%", "12.94%", "10.01%", "18.24%"] },
  { asset: "Volatility", cols: ["10.00%", "10.00%", "10.00%", "10.00%"] },
];

function parsePercent(v: string | number): number | null {
  if (typeof v === "number") return v;
  const m = /^\s*(-?)\s*(\d+(?:\.\d+)?)\s*%\s*$/.exec(v);
  if (!m) return null;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * parseFloat(m[2]);
}

export default function OptimalAllocationTable({
  headers = defaultHeaders,
  rows = defaultRows,
  width = "100%",
  height = "auto",
}: AllocationTableProps) {
  // Dev-only sanity checks
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
    const assert = (cond: boolean, msg: string) => { if (!cond && console) console.error("OptimalAllocationTable:", msg); };
    assert(headers.length >= 2, "headers must include 'Asset' + at least one data column");
    rows.forEach((r) => {
      if (r.asset !== "__divider__") {
        assert(r.cols.length === headers.length - 1, `Row '${r.asset}' has ${r.cols.length} cols; expected ${headers.length - 1}`);
        r.cols.forEach((c) => { const n = parsePercent(c); assert(n === null || typeof n === "number", "parsePercent number/null"); });
      }
    });
  }

  return (
    <section className="oaat-wrapper" style={{ width, height }}>
      <div className="card" role="region" aria-label="Optimal Asset Allocation">
        <div className="table-scroller">
          <table className="table" aria-label="Optimal Asset Allocation table">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} scope="col" className={i === 0 ? "left sticky-col" : "num"}>
                    {h.split("\n").map((line, idx) => (
                      <span key={idx} className={idx === 0 ? "head-strong" : "head-sub"}>{line}</span>
                    ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                if (r.asset === "__divider__") {
                  return (
                    <tr key={`div-${i}`} className="divider" aria-hidden>
                      <td className="sticky-col" />
                      {Array.from({ length: headers.length - 1 }).map((_, k) => <td key={k} />)}
                    </tr>
                  );
                }
                const emphasize = r.asset === "Stability Fund";
                const summary = r.asset === "Return" || r.asset === "Volatility";
                return (
                  <tr key={r.asset} className={`${emphasize ? "em" : ""} ${summary ? "summary" : ""}`}>
                    <th scope="row" className="left sticky-col">{r.asset}</th>
                    {r.cols.map((c, ci) => {
                      const n = parsePercent(c);
                      const cls = n == null ? "num" : n < 0 ? "num neg" : n > 0 ? "num pos" : "num";
                      return <td key={`${r.asset}-${ci}`} className={cls}>{c}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap');
        .oaat-wrapper { display: flex; justify-content: center; font-family: 'IBM Plex Sans', -apple-system, system-ui, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; }
        .card { width: 100%; background: #fff; color: #0f172a; border-radius: 0; padding: 12px 20px 16px; box-shadow: 0 6px 18px rgba(0,0,0,.06); border: 1px solid #e5e7eb; display: flex; flex-direction: column; }
        .table-scroller { overflow: auto; }
        table.table { width: 100%; min-width: 720px; border-collapse: separate; border-spacing: 0; font-size: 13px; background: #fff; }
        thead th { position: sticky; top: 0; background: #fff; text-align: right; padding: 10px 12px; color: #374151; font-weight: 600; border-bottom: 1px solid #e5e7eb; white-space: pre-line; }
        thead th.left { text-align: left; }
        .head-strong { display: block; line-height: 1; }
        .head-sub { display: block; font-size: 11px; color: #6b7280; margin-top: 3px; font-weight: 600; }
        tbody th.left { text-align: left; padding: 12px; font-weight: 600; color: #111827; border-right: 1px solid #f3f4f6; white-space: nowrap; background: #fff; }
        tbody td { padding: 12px; border-bottom: 1px solid #f3f4f6; text-align: right; font-variant-numeric: tabular-nums; }
        tbody tr:nth-child(odd):not(.summary):not(.divider) td,
        tbody tr:nth-child(odd):not(.summary):not(.divider) th.left { background: #fcfcfd; }
        tbody tr.em td, tbody tr.em th.left { background: #f5fbf7; font-weight: 700; }
        tbody tr.summary td, tbody tr.summary th.left { border-top: 2px solid #e5e7eb; background: #fff; font-weight: 700; }
        td.num.pos { color: #14532d; background-image: linear-gradient(to left, rgba(34,197,94,0.15), rgba(34,197,94,0)); background-clip: padding-box; }
        td.num.neg { color: #7f1d1d; background-image: linear-gradient(to left, rgba(239,68,68,0.15), rgba(239,68,68,0)); background-clip: padding-box; }
        .sticky-col { position: sticky; left: 0; z-index: 1; box-shadow: 1px 0 0 0 #f3f4f6; background: inherit; }
        @media (max-width: 640px) { .card{ padding:12px; } table.table{ font-size:12px; } .head-sub{ font-size:10px; } }
      `}</style>
    </section>
  );
}
