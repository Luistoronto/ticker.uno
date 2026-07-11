"use client";
// ─────────────────────────────────────────────────────────────
// WhaleMovementsClient.jsx
// Renderiza la lista de movimientos con:
//  - filtro por moneda (Todas / BTC / ETH)
//  - badge Compra/Vende
//  - avatar de la institución (iniciales, sin logos de terceros)
//  - monto en moneda nativa y USD
//  - gas fee en moneda nativa y como % de la transacción
//  - dirección y txid como links al explorador correspondiente
//  - popup tipo nube que sigue al mouse dentro de la fila
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { explorerAddressUrl, explorerTxUrl } from "@/data/whaleWallets";

function formatAmount(n) {
  return n.toLocaleString("es-AR", { maximumFractionDigits: 4 });
}

function formatUSD(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function shortAddress(addr) {
  if (!addr) return "Sin identificar";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function MovementRow({ m }) {
  const [cloud, setCloud] = useState({ visible: false, x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cloudWidth = 220;
    setCloud({
      visible: true,
      x: Math.max(0, Math.min(x + 14, rect.width - cloudWidth)),
      y: y + 18,
    });
  }

  const isBuy = m.side === "compra";

  return (
    <div
      className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCloud((c) => ({ ...c, visible: false }))}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium"
          style={{
            backgroundColor: m.institutionColor || "#e5e7eb",
            color: m.institutionTextColor || "#374151",
          }}
        >
          {m.institutionInitial || "?"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{m.institutionLabel}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                isBuy
                  ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                  : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
              }`}
            >
              {isBuy ? "Compra" : "Vende"}
            </span>
          </div>
          <a
            href={explorerAddressUrl(m.address, m.currency)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 dark:text-gray-500 font-mono hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
          >
            {shortAddress(m.address)}
          </a>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-sm font-medium">
            {formatAmount(m.amountNative)} {m.currency}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatUSD(m.amountUSD)}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-gray-100 dark:border-gray-800">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Gas fee
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatAmount(m.feeNative)} {m.currency}{" "}
          <span className="text-gray-400 dark:text-gray-600">
            ({m.feePct.toFixed(4)}%)
          </span>
        </span>
      </div>

      {cloud.visible && (
        <div
          className="absolute z-10 w-[220px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-3 pointer-events-none"
          style={{ left: cloud.x, top: cloud.y }}
        >
          <div
            className="absolute -top-1.5 left-5 w-3 h-3 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700"
            style={{ transform: "rotate(45deg)" }}
          />
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="text-gray-500 dark:text-gray-400 py-0.5">
                  Txid
                </td>
                <td className="text-right py-0.5">
                  <a
                    href={explorerTxUrl(m.txid, m.currency)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {shortAddress(m.txid)}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="text-gray-500 dark:text-gray-400 py-0.5">
                  Confirmaciones
                </td>
                <td
                  className={`text-right py-0.5 ${
                    m.confirmed
                      ? "text-green-600 dark:text-green-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {m.confirmed ? "Confirmada" : "Pendiente"}
                </td>
              </tr>
              <tr>
                <td className="text-gray-500 dark:text-gray-400 py-0.5">
                  Hace
                </td>
                <td className="text-right py-0.5">{m.timeAgoLabel}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function WhaleMovementsClient({ movements }) {
  const [filter, setFilter] = useState("all");

  const currencies = ["all", ...new Set(movements.map((m) => m.currency))];
  const filtered =
    filter === "all" ? movements : movements.filter((m) => m.currency === filter);

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3.5">
        {currencies.map((cur) => (
          <button
            key={cur}
            onClick={() => setFilter(cur)}
            className={`text-sm px-3.5 py-1.5 rounded-lg border transition-colors ${
              filter === cur
                ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white"
                : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {cur === "all" ? "Todas" : cur}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-400 dark:text-gray-500">
            No hay movimientos para esta moneda todavía.
          </div>
        ) : (
          filtered.map((m) => <MovementRow key={m.id} m={m} />)
        )}
      </div>
    </div>
  );
}

