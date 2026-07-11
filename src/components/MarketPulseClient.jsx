"use client";
// ─────────────────────────────────────────────────────────────
// MarketPulseClient.jsx
// Renderiza las cards de "Pulso del mercado" con:
//  - filtro por tipo (Todas / Majors / Stablecoins / Altcoins)
//  - filtro por red (Ethereum / Solana / BNB Chain), solo activo
//    cuando el tipo es "Altcoins"
//  - card por moneda: ícono, precio, variación 24h, sparkline 7d,
//    volumen 24h y market cap
// Los datos ya vienen resueltos desde MarketPulse (Server Component);
// acá solo filtramos y pintamos, sin fetch propio.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";

const TYPE_LABELS = { all: "Todas", majors: "Majors", stablecoins: "Stablecoins", altcoins: "Altcoins" };
const NETWORK_LABELS = { ethereum: "Ethereum", solana: "Solana", "bnb-chain": "BNB Chain" };

function formatUSD(n) {
  if (n == null) return "—";
  if (n >= 1) return `$${n.toLocaleString("en-US", { maximumFractionDigits: n >= 100 ? 0 : 2 })}`;
  return `$${n.toFixed(4)}`;
}

function formatCompact(n) {
  if (n == null) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString("en-US")}`;
}

function Sparkline({ prices, up }) {
  if (!prices || prices.length < 2) return <div style={{ height: "24px" }} />;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const points = prices
    .map((p, i) => {
      const x = (i / (prices.length - 1)) * 100;
      const y = 24 - ((p - min) / range) * 22 - 1;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 24" style={{ width: "100%", height: "24px", display: "block" }}>
      <polyline
        points={points}
        fill="none"
        stroke={up ? "#16a34a" : "#dc2626"}
        strokeWidth="2"
      />
    </svg>
  );
}

function CoinCard({ coin }) {
  const change = coin.price_change_percentage_24h;
  const up = change >= 0;
  const sparkline = coin.sparkline_in_7d?.price;

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "14px",
      background: "#ffffff",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {coin.image ? (
            <img src={coin.image} alt={coin.symbol} width={26} height={26} style={{ borderRadius: "50%" }} />
          ) : (
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f3f4f6" }} />
          )}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#111" }}>
              {coin.symbol?.toUpperCase()}
            </div>
            <div style={{ fontSize: "10px", color: "#9ca3af" }}>{coin.name}</div>
          </div>
        </div>
        {change != null && (
          <span style={{
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "8px",
            background: up ? "#f0fdf4" : "#fef2f2",
            color: up ? "#16a34a" : "#dc2626",
            fontWeight: "500",
          }}>
            {up ? "+" : ""}{change.toFixed(1)}%
          </span>
        )}
      </div>

      <div style={{ fontSize: "17px", fontWeight: "600", color: "#111", marginBottom: "6px" }}>
        {formatUSD(coin.current_price)}
      </div>

      <div style={{ marginBottom: "8px" }}>
        <Sparkline prices={sparkline} up={up} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#9ca3af" }}>
        <span>Vol 24h</span><span>{formatCompact(coin.total_volume)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#9ca3af" }}>
        <span>Cap</span><span>{formatCompact(coin.market_cap)}</span>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "12px",
        padding: "6px 14px",
        borderRadius: "20px",
        border: "1px solid " + (active ? "#111" : "#e5e7eb"),
        background: active ? "#111" : "transparent",
        color: active ? "#ffffff" : "#6b7280",
        cursor: "pointer",
        transition: "all .12s",
      }}
    >
      {children}
    </button>
  );
}

export default function MarketPulseClient({ majors, stablecoins, altcoins, networkIds }) {
  const [type, setType] = useState("all");
  const [network, setNetwork] = useState("all");

  const coins = useMemo(() => {
    let list;
    if (type === "majors") list = majors;
    else if (type === "stablecoins") list = stablecoins;
    else if (type === "altcoins") list = altcoins;
    else list = [...majors, ...stablecoins, ...altcoins];

    // El filtro de red solo tiene efecto sobre altcoins
    if (type === "altcoins" && network !== "all") {
      const idsInNetwork = new Set(networkIds[network] || []);
      list = list.filter((c) => idsInNetwork.has(c.id));
    }

    return list;
  }, [type, network, majors, stablecoins, altcoins, networkIds]);

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
        {Object.keys(TYPE_LABELS).map((key) => (
          <FilterButton
            key={key}
            active={type === key}
            onClick={() => {
              setType(key);
              if (key !== "altcoins") setNetwork("all");
            }}
          >
            {TYPE_LABELS[key]}
          </FilterButton>
        ))}

        {type === "altcoins" && (
          <>
            <div style={{ width: "1px", background: "#e5e7eb", margin: "0 4px" }} />
            <FilterButton active={network === "all"} onClick={() => setNetwork("all")}>
              Todas las redes
            </FilterButton>
            {Object.keys(NETWORK_LABELS).map((key) => (
              <FilterButton key={key} active={network === key} onClick={() => setNetwork(key)}>
                {NETWORK_LABELS[key]}
              </FilterButton>
            ))}
          </>
        )}
      </div>

      {coins.length === 0 ? (
        <div style={{ textAlign: "center", padding: "24px", fontSize: "13px", color: "#9ca3af" }}>
          No hay monedas para este filtro todavía.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
}

