"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function MapaClient({ marketPulse, whaleMovements }) {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(localStorage.getItem("ticker-lang") || "es");
  }, []);

  const t = {
    es: { market: "Pulso del mercado", whales: "Grandes movimientos" },
    en: { market: "Market pulse", whales: "Whale movements" },
  };
  const tx = t[lang];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar lang={lang} />

      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Barra de acento naranja — identidad ticker.uno */}
        <div style={{ height: "3px", background: "#f97316" }} />

        <div style={{ padding: "40px 40px", maxWidth: "960px" }}>

          {/* Pulso del mercado — MarketPulse llega como prop
              desde page.jsx (Server Component) */}
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{
              fontSize: "15px", fontWeight: "600", color: "#111",
              marginBottom: "14px",
            }}>
              {tx.market}
            </h2>
            {marketPulse}
          </div>

          {/* Grandes movimientos — WhaleMovements llega como prop
              desde page.jsx (Server Component) */}
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{
              fontSize: "15px", fontWeight: "600", color: "#111",
              marginBottom: "14px",
            }}>
              {tx.whales}
            </h2>
            {whaleMovements}
          </div>

        </div>
      </div>
    </div>
  );
}
