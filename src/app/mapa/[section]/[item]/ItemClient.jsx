"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function ItemClient({ item, subcategory, section }) {
  const [lang, setLang] = useState("es");
  useEffect(() => { setLang(localStorage.getItem("ticker-lang") || "es"); }, []);

  const data = item[lang] || item.es;
  const sectionData = section[lang] || section.es;
  const subData = subcategory[lang] || subcategory.es;

  // Info cards: extraídas de tags del item
  const infoCards = buildInfoCards(item, lang);

  // Ítems relacionados: hasta 3 del mismo subcategory, excluyendo el actual
  const relatedItems = subcategory.items
    .filter((i) => i.id !== item.id)
    .slice(0, 3);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar lang={lang} />

      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Barra de acento de sección — nueva */}
        <div style={{ height: "3px", background: section.color }} />

        <div style={{ padding: "28px 36px", maxWidth: "720px" }}>

          {/* Breadcrumb */}
          <nav style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "12px", color: "#9ca3af", marginBottom: "24px", flexWrap: "wrap",
          }}>
            <Link href="/mapa" style={{ color: "#9ca3af", textDecoration: "none" }}>
              {lang === "es" ? "mapa" : "map"}
            </Link>
            <span style={{ color: "#d1d5db" }}>/</span>
            <Link href={`/mapa/${section.id}`} style={{ color: "#9ca3af", textDecoration: "none" }}>
              {sectionData?.title}
            </Link>
            <span style={{ color: "#d1d5db" }}>/</span>
            <span style={{ color: "#374151" }}>{data?.name}</span>
          </nav>

          {/* Subcategoría */}
          <div style={{
            fontSize: "10px", fontWeight: "600", letterSpacing: ".1em",
            textTransform: "uppercase", color: section.color + "99", marginBottom: "8px",
          }}>
            {subData?.title}
          </div>

          {/* Título */}
          <h1 style={{
            fontSize: "28px", fontWeight: "600", letterSpacing: "-0.6px",
            color: section.color, marginBottom: "4px", lineHeight: "1.15",
          }}>
            {data?.name}
          </h1>

          {/* Subtítulo */}
          <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "18px" }}>
            {data?.subtitle}
          </p>

          {/* Tags */}
          {item.tags && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
              {item.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
                  background: section.color + "12", color: section.color,
                  border: `1px solid ${section.color}30`, fontWeight: "500",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Info cards — nueva fila de métricas rápidas */}
          {infoCards.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${infoCards.length}, 1fr)`,
              gap: "8px", marginBottom: "24px",
            }}>
              {infoCards.map((card) => (
                <div key={card.label} style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderTop: `2px solid ${section.color}`,
                  borderRadius: "10px",
                  padding: "10px 14px",
                }}>
                  <div style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "3px" }}>
                    {card.label}
                  </div>
                  <div style={{
                    fontSize: "13px", fontWeight: "600",
                    color: card.accent ? section.color : "#111111",
                  }}>
                    {card.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Separador */}
          <div style={{ height: "1px", background: "#f3f4f6", margin: "4px 0 22px" }} />

          {/* Descripción */}
          <div style={{
            fontSize: "13px", lineHeight: "1.85", color: "#374151",
            borderLeft: `3px solid ${section.color}40`,
            paddingLeft: "16px", marginBottom: "24px",
          }}>
            {data?.description}
          </div>

          {/* Link externo */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "12px", color: "#6b7280",
                border: "1px solid #e5e7eb", borderRadius: "10px",
                padding: "8px 16px", textDecoration: "none",
                marginBottom: "22px", background: "#ffffff",
                transition: "border-color .12s",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={section.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              {item.link.replace("https://", "").replace(/\/$/, "")}
            </a>
          )}

          {/* Sponsor slot — mejorado */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            border: "1px dashed #e5e7eb", borderRadius: "10px",
            padding: "11px 16px", marginBottom: "28px",
            background: "#fafafa",
          }}>
            <span style={{ color: "#f97316", fontSize: "12px" }}>★</span>
            <span style={{ fontSize: "11px", color: "#d1d5db" }}>
              {lang === "es"
                ? `Espacio disponible para patrocinador del sector ${sectionData?.title}`
                : `Sponsor slot available for the ${sectionData?.title} sector`}
            </span>
            <span style={{
              marginLeft: "auto", fontSize: "10px", fontWeight: "500",
              color: "#f97316", background: "#fff7ed",
              border: "1px solid #fed7aa", borderRadius: "10px",
              padding: "2px 8px", flexShrink: 0,
            }}>
              contacto@ticker.uno
            </span>
          </div>

          {/* Relacionados — nuevo bloque */}
          {relatedItems.length > 0 && (
            <>
              <div style={{
                fontSize: "10px", fontWeight: "600", letterSpacing: ".08em",
                textTransform: "uppercase", color: "#d1d5db", marginBottom: "10px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                {lang === "es" ? "En la misma sección" : "In the same section"}
                <div style={{ flex: 1, height: "1px", background: "#f3f4f6" }} />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(relatedItems.length, 3)}, 1fr)`,
                gap: "8px", marginBottom: "28px",
              }}>
                {relatedItems.map((rel) => {
                  const relData = rel[lang] || rel.es;
                  return (
                    <Link
                      key={rel.id}
                      href={`/mapa/${section.id}/${rel.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderTop: `2px solid ${section.color}40`,
                          borderRadius: "10px",
                          padding: "10px 12px",
                          cursor: "pointer",
                          transition: "border-color .12s, transform .1s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#9ca3af";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div style={{ fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "2px" }}>
                          {relData?.name}
                        </div>
                        <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                          {relData?.subtitle}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* Volver */}
          <Link
            href={`/mapa/${section.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "12px", color: "#9ca3af", textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            {lang === "es" ? `Volver a ${sectionData?.title}` : `Back to ${sectionData?.title}`}
          </Link>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// buildInfoCards — genera las info cards a partir de los tags
// del item. Podés expandir esta función cuando agregues más
// metadata a content.js (ej: item.consensus, item.year, etc.)
// ─────────────────────────────────────────────────────────────
function buildInfoCards(item, lang) {
  const cards = [];

  if (!item.tags || item.tags.length === 0) return cards;

  // Detectar tipo de red (L1, L2, etc.)
  const layerTag = item.tags.find((t) => /^L\d/.test(t));
  if (layerTag) {
    cards.push({
      label: lang === "es" ? "Tipo" : "Type",
      value: layerTag,
      accent: true,
    });
  }

  // Detectar mecanismo de consenso
  const consensusTag = item.tags.find((t) =>
    ["PoW", "PoS", "DPoS", "PoA", "PoH"].includes(t)
  );
  if (consensusTag) {
    const labels = { PoW: "Proof of Work", PoS: "Proof of Stake", DPoS: "Delegated PoS", PoA: "Proof of Authority", PoH: "Proof of History" };
    cards.push({
      label: lang === "es" ? "Consenso" : "Consensus",
      value: labels[consensusTag] || consensusTag,
      accent: false,
    });
  }

  // Siempre mostrar status activo si el item tiene link o tags
  cards.push({
    label: "Status",
    value: lang === "es" ? "● Activo" : "● Active",
    accent: true,
  });

  return cards.slice(0, 3); // máximo 3 cards
}
