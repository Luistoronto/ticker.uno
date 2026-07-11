// src/app/mapa/page.jsx
// ─────────────────────────────────────────────────────────────
// Página principal del mapa: ticker.uno/mapa
// Ahora funciona como dashboard en vivo: Pulso del mercado arriba,
// Grandes movimientos debajo. La navegación a las 12 categorías
// del ecosistema sigue disponible en el Sidebar (ya tenía esos
// links, la grilla que había acá era redundante).
//
// MarketPulse y WhaleMovements son Server Components (hacen fetch
// en el servidor), así que se renderizan acá y se le pasan a
// MapaClient como props — no se puede importar un Server Component
// directo dentro de un "use client".
// ─────────────────────────────────────────────────────────────

import MapaClient from "./MapaClient";
import MarketPulse from "@/components/MarketPulse";
import WhaleMovements from "@/components/WhaleMovements";

// Metadata SEO — Next.js la inyecta en el <head> automáticamente
export const metadata = {
  title: "ticker.uno — Dashboard cripto en español",
  description:
    "Precios en vivo, movimientos de wallets grandes y el mapa completo del ecosistema cripto en español.",
};

export default function MapaPage() {
  return (
    <MapaClient
      marketPulse={<MarketPulse />}
      whaleMovements={<WhaleMovements />}
    />
  );
}
