"use client";

import { useEffect, useRef, useState } from "react";

// symbol/slug quedan fijos (para mostrar e ícono), id es el ID de CoinGecko
const COIN_CONFIG = [
  { symbol: "BTC", slug: "btc", id: "bitcoin" },
  { symbol: "ETH", slug: "eth", id: "ethereum" },
  { symbol: "SOL", slug: "sol", id: "solana" },
  { symbol: "USDC", slug: "usdc", id: "usd-coin" },
  { symbol: "DOGE", slug: "doge", id: "dogecoin" },
  { symbol: "BNB", slug: "bnb", id: "binancecoin" },
  { symbol: "XRP", slug: "xrp", id: "ripple" },
  { symbol: "ADA", slug: "ada", id: "cardano" },
];

// Se muestran mientras carga el primer fetch, o si la API falla
const FALLBACK_COINS = COIN_CONFIG.map((c) => ({
  ...c,
  price: "—",
  change: "—",
  up: null,
}));

function formatPrice(value) {
  if (value == null) return "—";
  if (value >= 1) {
    return (
      "$" +
      value.toLocaleString("en-US", {
        minimumFractionDigits: value >= 100 ? 0 : 2,
        maximumFractionDigits: value >= 100 ? 0 : 2,
      })
    );
  }
  return "$" + value.toFixed(value < 0.01 ? 4 : 3);
}

function formatChange(value) {
  if (value == null) return { text: "—", up: null };
  const rounded = Math.round(value * 10) / 10;
  return { text: `${Math.abs(rounded).toFixed(1)}%`, up: rounded > 0 ? true : rounded < 0 ? false : null };
}

async function fetchPrices() {
  const ids = COIN_CONFIG.map((c) => c.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("CoinGecko request failed");
  const data = await res.json();

  return COIN_CONFIG.map((coin) => {
    const entry = data[coin.id];
    if (!entry) return { ...coin, price: "—", change: "—", up: null };
    const change = formatChange(entry.usd_24h_change);
    return {
      ...coin,
      price: formatPrice(entry.usd),
      change: change.text,
      up: change.up,
    };
  });
}

function TickerItem({ coin }) {
  const color =
    coin.up === true ? "#16a34a" : coin.up === false ? "#dc2626" : "#9ca3af";
  const arrow = coin.up === true ? "▲" : coin.up === false ? "▼" : "";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "0 14px",
        fontSize: "12px",
        color: "#111111",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${coin.slug}.svg`}
        width={14}
        height={14}
        alt=""
        draggable={false}
        style={{ flexShrink: 0 }}
      />
      {coin.symbol}
      <span style={{ fontWeight: 500 }}>{coin.price}</span>
      <span style={{ color }}>
        {arrow} {coin.change}
      </span>
    </span>
  );
}

export default function PriceTicker() {
  const [coins, setCoins] = useState(FALLBACK_COINS);
  const frameRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const halfWidthRef = useRef(0);
  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const rafRef = useRef(null);

  // Fetch de precios reales — carga inicial + refresco cada 60s
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const fresh = await fetchPrices();
        if (!cancelled) setCoins(fresh);
      } catch (err) {
        console.error("PriceTicker: no se pudo obtener precios de CoinGecko", err);
        // Si falla, se mantienen los últimos precios conocidos
      }
    }

    load();
    const interval = setInterval(load, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Animación: auto-scroll, pausa en hover, drag manual
  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track) return;

    const speed = 0.5;

    function measure() {
      halfWidthRef.current = track.scrollWidth / 2;
    }
    const measureTimeout = setTimeout(measure, 200);
    window.addEventListener("resize", measure);

    function wrap() {
      const half = halfWidthRef.current;
      if (half <= 0) return;
      if (posRef.current <= -half) posRef.current += half;
      if (posRef.current > 0) posRef.current -= half;
    }

    function loop() {
      if (!hoveringRef.current && !draggingRef.current) {
        posRef.current -= speed;
        wrap();
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    function onEnter() {
      hoveringRef.current = true;
    }
    function onLeave() {
      hoveringRef.current = false;
      draggingRef.current = false;
      frame.style.cursor = "grab";
    }
    function onDown(e) {
      draggingRef.current = true;
      startXRef.current = e.clientX;
      startPosRef.current = posRef.current;
      frame.style.cursor = "grabbing";
    }
    function onMove(e) {
      if (!draggingRef.current) return;
      posRef.current = startPosRef.current + (e.clientX - startXRef.current);
      wrap();
    }
    function onUp() {
      if (draggingRef.current) {
        draggingRef.current = false;
        frame.style.cursor = "grab";
      }
    }

    frame.addEventListener("mouseenter", onEnter);
    frame.addEventListener("mouseleave", onLeave);
    frame.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      clearTimeout(measureTimeout);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
      frame.removeEventListener("mouseenter", onEnter);
      frame.removeEventListener("mouseleave", onLeave);
      frame.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      className="price-ticker-wrap"
      ref={frameRef}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "relative",
        cursor: "grab",
        userSelect: "none",
        flex: 1,
        minWidth: 0,
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .price-ticker-wrap {
            visibility: hidden;
            pointer-events: none;
          }
        }
      `}</style>
      <div
        ref={trackRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          willChange: "transform",
        }}
      >
        {coins.map((coin, i) => (
          <TickerItem key={`a-${i}`} coin={coin} />
        ))}
        {coins.map((coin, i) => (
          <TickerItem key={`b-${i}`} coin={coin} />
        ))}
      </div>
    </div>
  );
}
