// src/app/mapa/[section]/[item]/page.jsx
// ─────────────────────────────────────────────────────────────
// Página de detalle de concepto: ticker.uno/mapa/defi/uniswap
// Es la página más importante para SEO: cada concepto tiene
// su propia URL, título y descripción únicos.
// ─────────────────────────────────────────────────────────────

import { sections, getItemById, getSectionById } from "@/data/content";
import { notFound } from "next/navigation";
import ItemClient from "./ItemClient";

// SEO: título y descripción propios de cada concepto
export async function generateMetadata({ params }) {
  const { section, item } = await params;
  const found = getItemById(section, item);
  if (!found) return {};
  const { item: itemData, section: sectionData } = found;
  return {
    title: `${itemData.es.name} — ${sectionData.es.title} — ticker.uno`,
    description: itemData.es.description,
  };
}

// Pre-genera todas las páginas de conceptos en build time
export function generateStaticParams() {
  return sections.flatMap((s) =>
    s.subcategories.flatMap((sub) =>
      sub.items.map((item) => ({
        section: s.id,
        item: item.id,
      }))
    )
  );
}

export default async function ItemPage({ params }) {
  const { section, item } = await params;
  const found = getItemById(section, item);
  if (!found) notFound();
  return <ItemClient {...found} />;
}
