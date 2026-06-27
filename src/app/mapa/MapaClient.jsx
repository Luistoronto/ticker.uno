"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { sections } from "@/data/content";

export default function MapaClient() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(localStorage.getItem("ticker-lang") || "es");
  }, []);

  const t = {
    es: {
      hero: "Mapa del ecosistema cripto",
      sub: "350+ conceptos organizados por capas. Desde Bitcoin hasta DeFi, regulación y más.",
      soon: "Próximamente",
    },
    en: {
      hero: "Crypto ecosystem map",
      sub: "350+ concepts organized by layers. From Bitcoin to DeFi, regulation and more.",
      soon: "Coming soon",
    },
  };
  const tx = t[lang];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar lang={lang} />

      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Barra de acento naranja — identidad ticker.uno */}
        <div style={{ height: "3px", background: "#f97316" }} />

        <div style={{ padding: "40px 40px", maxWidth: "960px" }}>

          {/* Hero */}
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{
              fontSize: "24px", fontWeight: "600", color: "#111",
              letterSpacing: "-0.5px", marginBottom: "8px",
            }}>
              {tx.hero}
            </h1>
            <p style={{ fontSize: "13px", color: "#6b7280", maxWidth: "480px", lineHeight: "1.6" }}>
              {tx.sub}
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "36px" }}>
            {[
              { n: "12", l: lang === "es" ? "secciones" : "sections" },
              { n: "350+", l: lang === "es" ? "conceptos" : "concepts" },
              { n: "80+", l: lang === "es" ? "proyectos" : "projects" },
              { n: "LatAm", l: lang === "es" ? "foco regional" : "regional focus" },
            ].map((s) => (
              <div key={s.l} style={{
                background: "#fafafa",
                border: "1px solid #e5e7eb",
                borderTop: "2px solid #f97316",
                borderRadius: "12px",
                padding: "12px 18px",
              }}>
                <div style={{ fontSize: "18px", fontWeight: "600", color: "#111" }}>{s.n}</div>
                <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Grid de secciones */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {sections.map((section) => {
              const totalItems = section.subcategories.reduce((acc, sub) => acc + sub.items.length, 0);
              return (
                <Link
                  key={section.id}
                  href={`/mapa/${section.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      border: "1px solid #e5e7eb",
                      borderTop: `3px solid ${section.color}`,
                      borderRadius: "14px",
                      padding: "18px",
                      background: "#ffffff",
                      transition: "border-color .15s, transform .1s",
                      cursor: "pointer",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = section.color + "80";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Título + contador */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#111", flex: 1 }}>
                        {section[lang]?.title}
                      </span>
                      <span style={{
                        fontSize: "10px", color: section.color,
                        background: section.color + "12",
                        border: `1px solid ${section.color}25`,
                        padding: "1px 7px", borderRadius: "10px",
                        fontWeight: "500",
                      }}>
                        {totalItems}
                      </span>
                    </div>

                    {/* Tagline */}
                    <p style={{
                      fontSize: "11px", color: "#6b7280",
                      lineHeight: "1.5", marginBottom: "12px",
                    }}>
                      {section[lang]?.tagline}
                    </p>

                    {/* Subcategorías */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {section.subcategories.slice(0, 3).map((sub) => (
                        <span key={sub.id} style={{
                          fontSize: "10px", padding: "2px 8px",
                          borderRadius: "20px",
                          background: section.color + "12",
                          color: section.color,
                        }}>
                          {sub[lang]?.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Coming soon cards */}
            {["NFTs & Web3", "Infraestructura", "Trading", "Actores", "Mining"].map((name) => (
              <div key={name} style={{
                border: "1px dashed #e5e7eb",
                borderRadius: "14px",
                padding: "18px",
                background: "transparent",
                opacity: 0.5,
              }}>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#d1d5db", marginBottom: "4px" }}>
                  {name}
                </div>
                <div style={{ fontSize: "11px", color: "#e5e7eb" }}>{tx.soon}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
