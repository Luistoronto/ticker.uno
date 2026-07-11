// src/app/layout.jsx
// ─────────────────────────────────────────────────────────────
// Este archivo envuelve TODA la app.
// Acá van las cosas que aparecen en TODAS las páginas:
//   - el <head> con el título y meta tags
//   - la barra de navegación superior
//   - el pie de página con el contacto
//   - el idioma y el dark mode
// ─────────────────────────────────────────────────────────────
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
export const metadata = {
  title: "Mapa Cripto — ticker.uno",
  description:
    "La guía más completa del ecosistema cripto en español. Conceptos, proyectos y actores organizados por capas.",
};
export default function RootLayout({ children }) {
  return (
    // lang="es" por defecto — el toggle de idioma lo maneja el componente LangToggle
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 flex flex-col">
        {/* Barra superior global */}
        <Navbar />
        {/* Contenido de cada página */}
        <main className="flex-1">{children}</main>
        {/* Pie de página global */}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
