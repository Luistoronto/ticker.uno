"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/data/content";

const icons = {
  book: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  "building-bank": <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg>,
  database: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  "stack-2": <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 2 10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5M22 8.5l-10 7-10-7"/></svg>,
  wallet: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 12h.01"/></svg>,
  "arrows-exchange": <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4"/></svg>,
  coin: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1M12 7v2m0 6v2"/></svg>,
  scale: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h2c2 0 4-1 4-3M17 7h2c2 0 4-1 4-3"/></svg>,
};

const groups = [
  { label: { es: "Ecosistema", en: "Ecosystem" }, ids: ["fundamentos", "layer-1", "layer-2", "defi", "stablecoins"] },
  { label: { es: "Acceso", en: "Access" }, ids: ["wallets", "exchanges"] },
  { label: { es: "Contexto", en: "Context" }, ids: ["regulacion", "actores"] },
];

export default function Sidebar({ lang }) {
  const pathname = usePathname();
  const activeSection = pathname.split("/")[2] || "";

  return (
    <aside style={{
      width: "200px",
      flexShrink: 0,
      borderRight: "1px solid #e5e7eb",
      background: "#ffffff",
      position: "sticky",
      top: "52px",
      height: "calc(100vh - 52px)",
      overflowY: "auto",
    }}>
      <div style={{ padding: "12px 0" }}>

        {/* Link principal Mapa */}
        <Link href="/mapa" style={{ textDecoration: "none" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "7px 16px 10px",
            fontSize: "12px",
            color: "#374151",
            fontWeight: "500",
            borderBottom: "1px solid #f3f4f6",
            marginBottom: "4px",
          }}>
            <span style={{
              width: "22px", height: "22px", borderRadius: "6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, background: "#fff7ed", color: "#f97316",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            </span>
            {lang === "es" ? "Mapa cripto" : "Crypto map"}
          </div>
        </Link>

        {groups.map((group) => (
          <div key={group.label.es}>

            {/* Etiqueta de grupo */}
            <div style={{
              padding: "10px 16px 4px",
              fontSize: "10px",
              fontWeight: "600",
              color: "#6b7280",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}>
              {group.label[lang]}
            </div>

            {/* Items del grupo */}
            {group.ids.map((id) => {
              const section = sections.find((s) => s.id === id);
              if (!section && id !== "actores") return null;

              // Caso especial: Actores no está en content.js
              if (id === "actores") {
                const active = activeSection === "actores" || pathname.startsWith("/actores");
                return (
                  <Link key="actores" href="/actores" style={{ textDecoration: "none" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "7px 16px", fontSize: "12px",
                      color: active ? "#111111" : "#6b7280",
                      background: active ? "#f9fafb" : "transparent",
                      borderLeft: active ? "2px solid #ec4899" : "2px solid transparent",
                      fontWeight: active ? "500" : "400",
                    }}>
                      <span style={{
                        width: "22px", height: "22px", borderRadius: "6px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                        background: active ? "#ec489918" : "#ec489910",
                        color: active ? "#ec4899" : "#ec489999",
                      }}>
                        {icons["users"] || <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                      </span>
                      {lang === "es" ? "Actores" : "Actors"}
                    </div>
                  </Link>
                );
              }
              if (!section) return null;
              const active = activeSection === id;

              return (
                <Link
                  key={id}
                  href={`/mapa/${id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 16px",
                    fontSize: "12px",
                    textDecoration: "none",
                    color: active ? "#111111" : "#374151",
                    background: active ? "#f9fafb" : "transparent",
                    borderLeft: active ? `2px solid ${section.color}` : "2px solid transparent",
                    fontWeight: active ? "500" : "400",
                    transition: "all .12s",
                  }}
                >
                  {/* Ícono con background coloreado — mejorado */}
                  <span style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: active ? section.color + "18" : section.color + "10",
                    color: active ? section.color : section.color + "99",
                    transition: "all .12s",
                  }}>
                    {icons[section.icon]}
                  </span>

                  {section[lang]?.title}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
