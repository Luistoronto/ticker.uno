"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { actores } from "@/data/actores";

const FILTROS = {
  es: { todos: "Todos", creador: "Creadores", empresario: "Empresarios", educador: "Educadores", inversor: "Inversores", controversial: "Controversiales" },
  en: { todos: "All", creador: "Creators", empresario: "Entrepreneurs", educador: "Educators", inversor: "Investors", controversial: "Controversial" },
};

export default function ActoresClient() {
  const [lang, setLang] = useState("es");
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    setLang(localStorage.getItem("ticker-lang") || "es");
  }, []);

  const filtrados = filtro === "todos" ? actores : actores.filter((a) => a.categoria === filtro);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar lang={lang} />
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Barra de acento rosa */}
        <div style={{ height: "3px", background: "#ec4899" }} />

        <div style={{ padding: "28px 36px", maxWidth: "960px" }}>

          {/* Header */}
          <h1 style={{ fontSize: "22px", fontWeight: "500", color: "#111", letterSpacing: "-.4px", marginBottom: "8px" }}>
            {lang === "es" ? "Actores del ecosistema" : "Ecosystem actors"}
          </h1>
          <p style={{ fontSize: "13px", color: "#374151", marginBottom: "24px", maxWidth: "480px", lineHeight: "1.6" }}>
            {lang === "es"
              ? "Las personas que dieron forma a la historia del cripto — sus ideas, proyectos y controversias."
              : "The people who shaped crypto history — their ideas, projects and controversies."}
          </p>

          {/* Filtros */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "28px" }}>
            {Object.entries(FILTROS[lang]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFiltro(key)}
                style={{
                  fontSize: "11px", fontWeight: "500",
                  padding: "5px 14px", borderRadius: "20px",
                  border: filtro === key ? "1px solid #ec489940" : "1px solid #e5e7eb",
                  background: filtro === key ? "#ec489912" : "#ffffff",
                  color: filtro === key ? "#ec4899" : "#374151",
                  cursor: "pointer", transition: "all .12s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid de cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {filtrados.map((actor) => {
              const data = actor[lang] || actor.es;
              return (
                <Link key={actor.id} href={`/actores/${actor.id}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: "#ffffff", border: "1px solid #e5e7eb",
                      borderTop: `2.5px solid ${actor.color}`,
                      borderRadius: "12px", padding: "16px",
                      cursor: "pointer", height: "100%",
                      transition: "border-color .12s, transform .1s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = actor.color + "60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {/* Foto + nombre */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      {actor.foto ? (
                        <img
                          src={actor.foto}
                          alt={`Foto de ${data.nombre}`}
                          style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e7eb", flexShrink: 0 }}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div style={{
                        width: "42px", height: "42px", borderRadius: "50%",
                        background: actor.color + "18", color: actor.color,
                        display: actor.foto ? "none" : "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "13px", fontWeight: "500", flexShrink: 0,
                        border: "1px solid " + actor.color + "30",
                      }}>
                        {actor.iniciales}
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "500", color: "#111", marginBottom: "2px" }}>{data.nombre}</div>
                        <div style={{ fontSize: "10px", color: "#374151" }}>{data.rol.split("·")[0].trim()}</div>
                      </div>
                    </div>

                    {/* Bio corta */}
                    <p style={{ fontSize: "11px", color: "#374151", lineHeight: "1.6", marginBottom: "12px" }}>
                      {data.bio.slice(0, 120)}...
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                      {actor.tags.slice(0, 3).map((tag) => (
                        <span key={tag} style={{
                          fontSize: "10px", padding: "2px 8px", borderRadius: "10px",
                          background: actor.color + "12", color: actor.color,
                          border: `1px solid ${actor.color}25`,
                        }}>{tag}</span>
                      ))}
                    </div>

                    {/* Status */}
                    <div style={{ fontSize: "10px", fontWeight: "500", color: data.statusColor, display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: data.statusColor, display: "inline-block" }} />
                      {data.status}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
