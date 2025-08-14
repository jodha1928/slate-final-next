import { IBM_Plex_Sans } from "next/font/google";
import React from "react";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

type Row = { name: string; vals: number[] };
type Props = {
  /** Optional override for matrix labels (columns) */
  columns?: string[];
  /** Optional override for row data (must match columns length) */
  data?: Row[];
  /** Fixed pixel size per your spec */
  width?: number;
  height?: number;
};

export default function CorrelationMatrix({
  columns = [
    "Stability Fund",
    "S&P 500",
    "Aggregate Bonds",
    "Bitcoin",
    "Ethereum",
    "Commodities",
    "Gold",
  ],
  data = [
    { name: "Stability Fund", vals: [1.0, -0.03, 0.0, -0.21, -0.3, -0.04, -0.02] },
    { name: "SPY", vals: [-0.03, 1.0, 0.19, 0.3, 0.29, 0.34, 0.16] },
    { name: "Aggregate Bonds", vals: [0.0, 0.19, 1.0, 0.14, 0.14, 0.04, 0.34] },
    { name: "Bitcoin", vals: [-0.21, 0.3, 0.14, 1.0, 0.82, 0.09, 0.1] },
    { name: "Ethereum", vals: [-0.3, 0.29, 0.14, 0.82, 1.0, 0.09, 0.11] },
    { name: "Commodities", vals: [-0.04, 0.34, 0.04, 0.09, 0.09, 1.0, 0.32] },
    { name: "Gold", vals: [-0.02, 0.16, 0.34, 0.1, 0.11, 0.32, 1.0] },
  ],
  width = 925.69,
  height = 440,
}: Props) {
  // green for positive, red for negative; white-ish near zero
  const cellBg = (v: number) => {
    const mag = Math.min(Math.abs(v), 1);
    const lightness = 95 - mag * 55; // 0 => 95%, 1 => 40%
    const hue = v >= 0 ? 120 : 0; // green : red
    return `hsl(${hue} 60% ${lightness}%)`;
  };

  return (
    <section className={`${plex.className} cmx-wrapper`} style={{ width, height }}>
      <div className="card">
        <header className="card-header">
          <h2>Asset Correlation Matrix</h2>
        </header>

        <div className="table-scroller">
          <table className="matrix" aria-label="Correlation matrix (green positive, red negative)">
            <thead>
              <tr>
                <th scope="col">Asset</th>
                {columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rIdx) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  {row.vals.map((v, cIdx) =>
                    rIdx === cIdx ? (
                      <td
                        key={`${rIdx}-${cIdx}`}
                        className="diag"
                        aria-label={`${row.name} vs ${columns[cIdx]} (self)`}
                      />
                    ) : (
                      <td
                        key={`${rIdx}-${cIdx}`}
                        style={{ backgroundColor: cellBg(v) }}
                        aria-label={`${row.name} vs ${columns[cIdx]} correlation ${v.toFixed(2)}`}
                      >
                        <span className="cell-number">{v.toFixed(2)}</span>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="legend" aria-label="Color legend">
          <div className="legend-item">
            <span className="swatch swatch-green" /> Low correlation (green) = Good for diversification
          </div>
          <div className="legend-item">
            <span className="swatch swatch-red" /> High correlation (red) = Poor diversification benefit
          </div>
        </div>
      </div>

      <style jsx>{`
        .cmx-wrapper {
          display: flex;
          justify-content: center;
        }
        .card {
          width: 100%;
          height: 100%;
          background: #ffffff;
          color: #0f172a;
          border-radius: 0; /* no rounded corners */
          padding: 20px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
        }
        .card-header {
          margin-bottom: 8px;
        }
        .card-header h2 {
          font-size: 16px; /* slightly smaller per your request */
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .table-scroller {
          overflow-x: auto;
          flex: 1;
        }
        table.matrix {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          min-width: 760px;
          background: #ffffff;
          font-size: 13px; /* slightly smaller */
        }
        thead th {
          position: sticky;
          top: 0;
          background: #ffffff;
          font-weight: 600;
          text-align: left;
          padding: 12px 14px;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }
        tbody th {
          background: #ffffff;
          padding: 12px 14px;
          font-weight: 600;
          color: #111827;
          text-align: left;
          border-right: 1px solid #f3f4f6;
          white-space: nowrap;
        }
        tbody td {
          padding: 10px 8px;
          text-align: center;
          font-variant-numeric: tabular-nums;
          color: #111827;
          border: 1px solid #f3f4f6;
        }
        .cell-number {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.65);
        }
        td.diag {
          background: #ffffff; /* blank diagonal */
        }

        .legend {
          display: flex;
          gap: 20px;
          margin-top: 8px;
          font-size: 13px;
          color: #111827;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .swatch {
          width: 16px;
          height: 16px;
          display: inline-block;
        }
        .swatch-green {
          background: #2ecc71;
        }
        .swatch-red {
          background: #e74c3c;
        }

        @media (max-width: 640px) {
          .card {
            padding: 16px;
            width: 100%;
            height: auto;
          }
          thead th,
          tbody th {
            font-size: 12px;
          }
          .cell-number {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}
