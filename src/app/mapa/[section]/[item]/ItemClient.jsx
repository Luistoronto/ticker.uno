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

  return (
    <div style={{ display: "flex" }}>
      <Sidebar lang={lang} />

      <div style={{ flex: 1, minWidth: 0, padding: "40px", maxWidth: "760px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#9ca3af", marginBottom: "32px", flexWrap: "wrap" }}>
          <Link href="/mapa" style={{ color: "#9ca3af", textDecoration: "none" }}>
            {lang === "es" ? "mapa" : "map"}
          </Link>
          <span>/</span>
          <Link href={`/mapa/${section.id}`} style={{ color: "#9ca3af", textDecoration: "none" }}>
            {sectionData?.title}
          </Link>
          <span>/</span>
          <span style={{ color: "#374151" }}>{data?.name}</span>
        </nav>

        {/* Subcategoría */}
        <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: section.color + "99", marginBottom: "10px" }}>
          {subData?.title}
        </div>

        {/* Nombre */}
        <h1 style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-0.6px", color: section.color, marginBottom: "6px" }}>
          {data?.name}
        </h1>

        {/* Subtítulo */}
        <p style={{ fontSize: "15px", color: "#9ca3af", marginBottom: "20px" }}>
          {data?.subtitle}
        </p>

        {/* Tags */}
        {item.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
            {item.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
                background: section.color + "12", color: section.color,
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Descripción */}
        <div style={{
          fontSize: "14px", lineHeight: "1.8", color: "#374151",
          borderLeft: `3px solid ${section.color}44`,
          paddingLeft: "16px", marginBottom: "32px",
        }}>
          {data?.description}
        </div>

        {/* Link externo */}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            fontSize: "12px", color: "#6b7280",
            border: "1px solid #e5e7eb", borderRadius: "10px",
            padding: "8px 16px", textDecoration: "none",
            marginBottom: "32px", transition: "border-color .12s",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            {item.link.replace("https://", "").replace(/\/$/, "")}
          </a>
        )}

        {/* Sponsor slot */}
        <div style={{
          border: "1px dashed #e5e7eb", borderRadius: "10px",
          padding: "12px 16px", marginBottom: "32px",
          fontSize: "11px", color: "#d1d5db",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span>★</span>
          <span>{lang === "es"
            ? `Espacio disponible para patrocinador del sector ${sectionData?.title} — contacto@ticker.uno`
            : `Sponsor slot available for the ${sectionData?.title} sector — contacto@ticker.uno`}
          </span>
        </div>

        {/* Volver */}
        <Link href={`/mapa/${section.id}`} style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "12px", color: "#9ca3af", textDecoration: "none",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          {lang === "es" ? `Volver a ${sectionData?.title}` : `Back to ${sectionData?.title}`}
        </Link>
      </div>
    </div>
  );
}
