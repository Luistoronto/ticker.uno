"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function ActorClient({ actor }) {
  const [lang, setLang] = useState("es");
  const [fotoError, setFotoError] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem("ticker-lang") || "es");
  }, []);

  const data = actor[lang] || actor.es;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar lang={lang} />
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Barra de acento del color del actor */}
        <div style={{ height: "3px", background: actor.color }} />

        <div style={{ padding: "28px 36px", maxWidth: "720px" }}>

          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", marginBottom: "24px", flexWrap: "wrap" }}>
            <Link href="/mapa" style={{ color: "#4b5563", textDecoration: "none" }}>mapa</Link>
            <span style={{ color: "#d1d5db" }}>/</span>
            <Link href="/actores" style={{ color: "#4b5563", textDecoration: "none" }}>
              {lang === "es" ? "actores" : "actors"}
            </Link>
            <span style={{ color: "#d1d5db" }}>/</span>
            <span style={{ color: "#111" }}>{data.nombre}</span>
          </nav>

          {/* Hero */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px" }}>
            {/* Foto con fallback */}
            {actor.foto && !fotoError ? (
              <img
                src={actor.foto}
                alt={`Foto de ${data.nombre}`}
                onError={() => setFotoError(true)}
                style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb", flexShrink: 0 }}
              />
            ) : (
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: actor.color + "18", color: actor.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", fontWeight: "500", flexShrink: 0,
                border: `2px solid ${actor.color}30`,
              }}>
                {actor.iniciales}
              </div>
            )}

            <div style={{ flex: 1 }}>
              {/* Categoría */}
              <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: actor.color + "99", marginBottom: "6px" }}>
                {lang === "es"
                  ? { creador: "Creador", empresario: "Empresario", educador: "Educador", inversor: "Inversor", controversial: "Controversial" }[actor.categoria]
                  : { creador: "Creator", empresario: "Entrepreneur", educador: "Educator", inversor: "Investor", controversial: "Controversial" }[actor.categoria]
                }
              </div>

              {/* Nombre */}
              <h1 style={{ fontSize: "26px", fontWeight: "500", color: actor.color, letterSpacing: "-.5px", marginBottom: "4px", lineHeight: "1.15" }}>
                {data.nombre}
              </h1>

              {/* Rol */}
              <p style={{ fontSize: "13px", color: "#374151", marginBottom: "14px" }}>{data.rol}</p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {actor.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: "10px", padding: "3px 10px", borderRadius: "20px",
                    background: actor.color + "12", color: actor.color,
                    border: `1px solid ${actor.color}30`, fontWeight: "500",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "24px" }}>
            {[
              { label: lang === "es" ? "Nacimiento" : "Birth", value: data.nacimiento },
              { label: lang === "es" ? "Origen" : "Origin", value: data.origen },
              { label: "Status", value: data.status, color: data.statusColor },
            ].map((card) => (
              <div key={card.label} style={{
                background: "#ffffff", border: "1px solid #e5e7eb",
                borderTop: `2px solid ${actor.color}`,
                borderRadius: "10px", padding: "10px 14px",
              }}>
                <div style={{ fontSize: "10px", color: "#4b5563", marginBottom: "3px" }}>{card.label}</div>
                <div style={{ fontSize: "12px", fontWeight: "500", color: card.color || "#111" }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Separador */}
          <div style={{ height: "1px", background: "#f3f4f6", marginBottom: "22px" }} />

          {/* Bio */}
          <SectionTitle>{lang === "es" ? "Biografía" : "Biography"}</SectionTitle>
          <div style={{ fontSize: "13px", lineHeight: "1.85", color: "#374151", borderLeft: `3px solid ${actor.color}40`, paddingLeft: "16px", marginBottom: "28px" }}>
            {data.bio}
          </div>

          {/* Proyectos */}
          <SectionTitle>{lang === "es" ? "Proyectos clave" : "Key projects"}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "28px" }}>
            {data.proyectos.map((p) => (
              <div key={p.nombre} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "#111", flex: 1 }}>{p.nombre}</span>
                  <span style={{ fontSize: "10px", color: "#4b5563" }}>{p.año}</span>
                </div>
                <p style={{ fontSize: "11px", color: "#374151", lineHeight: "1.5" }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Controversias */}
          {data.controversias && data.controversias.length > 0 && (
            <>
              <SectionTitle>{lang === "es" ? "Controversias" : "Controversies"}</SectionTitle>
              <div style={{ marginBottom: "28px" }}>
                {data.controversias.map((c) => (
                  <div key={c.titulo} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: "0.5px solid #f3f4f6" }}>
                    <svg style={{ flexShrink: 0, marginTop: "2px", color: "#f59e0b" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: "500", color: "#111", marginBottom: "2px" }}>{c.titulo}</div>
                      <div style={{ fontSize: "11px", color: "#374151", lineHeight: "1.5" }}>{c.desc}</div>
                    </div>
                    <div style={{ fontSize: "10px", color: "#4b5563", flexShrink: 0, paddingTop: "2px" }}>{c.año}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Separador */}
          <div style={{ height: "1px", background: "#f3f4f6", marginBottom: "22px" }} />

          {/* Links */}
          <SectionTitle>Links</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {actor.web && (
              <a href={actor.web} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={actor.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                {actor.web.replace("https://", "").replace(/\/$/, "")}
              </a>
            )}
            {actor.twitter && (
              <a href={actor.twitter} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1d9bf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.4 5.6 3.9 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                Twitter / X
              </a>
            )}
            {actor.wikipedia && (
              <a href={actor.wikipedia} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                Wikipedia
              </a>
            )}
          </div>

          {/* Volver */}
          <Link href="/actores" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            {lang === "es" ? "Volver a Actores" : "Back to Actors"}
          </Link>

        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  display: "inline-flex", alignItems: "center", gap: "7px",
  fontSize: "12px", color: "#374151",
  border: "1px solid #e5e7eb", borderRadius: "10px",
  padding: "7px 14px", textDecoration: "none", background: "#ffffff",
};

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: "10px", fontWeight: "600", letterSpacing: ".08em",
      textTransform: "uppercase", color: "#4b5563", marginBottom: "10px",
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      {children}
      <div style={{ flex: 1, height: "1px", background: "#f3f4f6" }} />
    </div>
  );
}
