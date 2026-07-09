"use client";

import { useEffect, useRef } from "react";

// Datos de ejemplo — reemplazar por el fetch real a CoinGecko
// Cada coin necesita: symbol (para mostrar), slug (para el ícono), price, change, up
const COINS = [
  { symbol: "BTC", slug: "btc", price: "$97,412", change: "2.4%", up: true },
  { symbol: "ETH", slug: "eth", price: "$3,684", change: "1.1%", up: false },
  { symbol: "SOL", slug: "sol", price: "$218", change: "5.7%", up: true },
  { symbol: "USDC", slug: "usdc", price: "$1.00", change: "0.0%", up: null },
  { symbol: "DOGE", slug: "doge", price: "$0.184", change: "3.2%", up: false },
  { symbol: "BNB", slug: "bnb", price: "$612", change: "0.8%", up: true },
  { symbol: "XRP", slug: "xrp", price: "$2.31", change: "1.6%", up: true },
  { symbol: "ADA", slug: "ada", price: "$0.891", change: "0.4%", up: false },
];

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
  const frameRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const halfWidthRef = useRef(0);
  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const rafRef = useRef(null);

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
        {COINS.map((coin, i) => (
          <TickerItem key={`a-${i}`} coin={coin} />
        ))}
        {COINS.map((coin, i) => (
          <TickerItem key={`b-${i}`} coin={coin} />
        ))}
      </div>
    </div>
  );
}
