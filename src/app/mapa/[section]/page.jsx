// src/app/mapa/[section]/page.jsx
// ─────────────────────────────────────────────────────────────
// Página de sección: ticker.uno/mapa/defi
// Next.js genera automáticamente una página por cada sección
// gracias a los corchetes [section] en el nombre de la carpeta.
// ─────────────────────────────────────────────────────────────

import { sections, getSectionById } from "@/data/content";
import { notFound } from "next/navigation";
import SectionClient from "./SectionClient";

// Genera metadata SEO específica por sección
export async function generateMetadata({ params }) {
  const { section } = await params;
  const s = getSectionById(section);
  if (!s) return {};
  return {
    title: `${s.es.title} — Mapa Cripto ticker.uno`,
    description: s.es.description,
  };
}

// Le dice a Next.js qué páginas pre-generar (una por sección)
export function generateStaticParams() {
  return sections.map((s) => ({ section: s.id }));
}

export default async function SectionPage({ params }) {
  const { section } = await params;
  const sectionData = getSectionById(section);

  // Si la sección no existe, muestra la página 404
  if (!sectionData) notFound();

  return <SectionClient section={sectionData} />;
}
