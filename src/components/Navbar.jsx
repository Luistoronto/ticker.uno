"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [lang, setLang] = useState("es");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem("ticker-lang") || "es");
  }, []);

  function toggleLang() {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    localStorage.setItem("ticker-lang", next);
    window.location.reload();
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}>

          {/* Logo — negro, solo texto */}
          <Link href="/mapa" style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "#111111",
            textDecoration: "none",
            letterSpacing: "-0.4px",
            flexShrink: 0,
          }}>
            ticker<span style={{ color: "#f97316" }}>.</span>uno
          </Link>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Buscador */}
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              fontSize: "12px",
              color: "#9ca3af",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              background: "#fafafa",
              cursor: "pointer",
              width: "160px",
              transition: "border-color .15s",
            }}
            aria-label="Abrir buscador"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{ flex: 1, textAlign: "left" }}>
              {lang === "es" ? "Buscar..." : "Search..."}
            </span>
            <kbd style={{
              fontSize: "10px",
              background: "#e5e7eb",
              color: "#9ca3af",
              padding: "1px 5px",
              borderRadius: "4px",
            }}>/</kbd>
          </button>

          {/* Toggle idioma */}
          <button
            onClick={toggleLang}
            style={{
              display: "flex",
              fontSize: "11px",
              fontWeight: "500",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              overflow: "hidden",
              flexShrink: 0,
              cursor: "pointer",
            }}
            aria-label="Cambiar idioma"
          >
            <span style={{
              padding: "5px 12px",
              background: lang === "es" ? "#f97316" : "transparent",
              color: lang === "es" ? "#ffffff" : "#9ca3af",
              transition: "all .15s",
            }}>
              ES
            </span>
            <span style={{
              padding: "5px 12px",
              background: lang === "en" ? "#f97316" : "transparent",
              color: lang === "en" ? "#ffffff" : "#9ca3af",
              transition: "all .15s",
            }}>
              EN
            </span>
          </button>

        </div>
      </nav>

      {searchOpen && <SearchModal lang={lang} onClose={() => setSearchOpen(false)} />}
    </>
  );
}
