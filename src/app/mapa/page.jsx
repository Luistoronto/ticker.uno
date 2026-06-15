// src/app/mapa/page.jsx
// ─────────────────────────────────────────────────────────────
// Página principal del mapa: ticker.uno/mapa
// Muestra todas las secciones como cards de entrada.
// Lee el idioma del localStorage (client side).
// ─────────────────────────────────────────────────────────────

import MapaClient from "./MapaClient";

// Metadata SEO — Next.js la inyecta en el <head> automáticamente
export const metadata = {
  title: "Mapa Cripto — ticker.uno",
  description:
    "La guía más completa del ecosistema cripto en español e inglés. 350+ conceptos organizados por capas.",
};

export default function MapaPage() {
  return <MapaClient />;
}
