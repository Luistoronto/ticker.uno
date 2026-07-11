"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function SectionClient({ section }) {
  const [lang, setLang] = useState("es");
  useEffect(() => { setLang(localStorage.getItem("ticker-lang") || "es"); }, []);

  const data = section[lang] || section.es;
  const totalItems = section.subcategories.reduce((acc, sub) => acc + sub.items.length, 0);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar lang={lang} />

      <div style={{ flex: 1, minWidth: 0, padding: "40px", maxWidth: "960px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", marginBottom: "28px" }}>
          <Link href="/mapa" style={{ color: "#4b5563", textDecoration: "none" }}>
            {lang === "es" ? "mapa" : "map"}
          </Link>
          <span>/</span>
          <span style={{ color: "#374151" }}>{data.title}</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "10px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: "600", letterSpacing: "-0.5px", color: section.color }}>
              {data.title}
            </h1>
            <span style={{
              fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
              border: "1px solid #e5e7eb", color: "#374151", flexShrink: 0, marginTop: "6px",
            }}>
              {totalItems} {lang === "es" ? "conceptos" : "concepts"}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: "1.7", maxWidth: "560px" }}>
            {data.tagline}
          </p>
        </div>

        {/* Sponsor banner */}
        {section.sponsor ? (
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 16px", marginBottom: "28px",
            border: "1px solid #fed7aa", borderRadius: "10px",
            background: "#fff7ed", fontSize: "12px", color: "#c2410c",
          }}>
            <span>★</span>
            <span>{lang === "es" ? "Patrocinado por" : "Sponsored by"} <strong>{section.sponsor.name}</strong></span>
          </div>
        ) : (
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "9px 16px", marginBottom: "28px",
            border: "1px dashed #e5e7eb", borderRadius: "10px",
            fontSize: "11px", color: "#6b7280",
          }}>
            <span>★</span>
            <span>{lang === "es" ? "Sección disponible para patrocinar — hi@ticker.uno" : "Section available to sponsor — hi@ticker.uno"}</span>
          </div>
        )}

        {/* Subcategorías */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {section.subcategories.map((sub) => (
            <div key={sub.id}>
              {/* Título subcategoría */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".08em", textTransform: "uppercase", color: "#6b7280", whiteSpace: "nowrap" }}>
                  {sub[lang]?.title || sub.es?.title}
                </span>
                <div style={{ flex: 1, height: "1px", background: "#f3f4f6" }} />
              </div>

              {/* Grid de cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {sub.items.map((item) => {
                  const itemData = item[lang] || item.es;
                  return (
                    <Link key={item.id} href={`/mapa/${section.id}/${item.id}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          padding: "12px 14px",
                          background: "#ffffff",
                          cursor: "pointer",
                          transition: "border-color .12s",
                          height: "100%",
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#6b7280"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                      >
                        <div style={{ fontSize: "12px", fontWeight: "600", color: section.color, marginBottom: "3px" }}>
                          {itemData?.name}
                        </div>
                        <div style={{ fontSize: "10px", color: "#4b5563", marginBottom: "8px", lineHeight: "1.4" }}>
                          {itemData?.subtitle}
                        </div>
                        {item.tags && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                            {item.tags.slice(0, 2).map((tag) => (
                              <span key={tag} style={{
                                fontSize: "9px", padding: "2px 6px", borderRadius: "20px",
                                background: section.color + "12", color: section.color,
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
