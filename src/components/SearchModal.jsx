"use client";
// ─────────────────────────────────────────────────────────────
// SearchModal.jsx
// Modal de búsqueda que aparece al presionar "/" o el botón.
// Usa Fuse.js para búsqueda fuzzy: encuentra resultados aunque
// el usuario escriba mal (ej: "uniswpa" → "Uniswap").
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { getAllItems, sections } from "@/data/content";

export default function SearchModal({ lang, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  // Preparamos el índice de búsqueda con todos los items
  const allItems = getAllItems();

  const fuse = new Fuse(allItems, {
    // Campos donde buscar
    keys: [
      { name: `${lang}.name`, weight: 2 },        // nombre (más peso)
      { name: `${lang}.subtitle`, weight: 1 },     // subtítulo
      { name: `${lang}.description`, weight: 0.5 },// descripción
      { name: "tags", weight: 1 },                 // tags
    ],
    threshold: 0.35,   // qué tan estricta es la búsqueda (0 = exacta, 1 = cualquier cosa)
    includeScore: true,
  });

  // Enfoca el input automáticamente al abrir
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Actualiza resultados mientras el usuario escribe
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = fuse.search(query).slice(0, 8); // máximo 8 resultados
    setResults(found);
  }, [query]);

  // Navega al concepto seleccionado
  function goTo(item) {
    router.push(`/mapa/${item.sectionId}/${item.id}`);
    onClose();
  }

  // Busca el nombre de la sección para mostrarlo en el resultado
  function getSectionName(sectionId) {
    const s = sections.find((x) => x.id === sectionId);
    return s ? s[lang].title : sectionId;
  }

  return (
    // Overlay oscuro de fondo — click fuera cierra el modal
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="
        w-full max-w-lg
        bg-white dark:bg-[#0d0d1a]
        border border-gray-200 dark:border-[#1e1e3a]
        rounded-xl overflow-hidden
      ">
        {/* Input de búsqueda */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-[#1a1a2e]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "es" ? "Buscar concepto, proyecto..." : "Search concept, project..."}
            className="
              flex-1 text-sm bg-transparent outline-none
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-600
            "
          />
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-[#1e1e3a] px-2 py-0.5 rounded"
          >
            Esc
          </button>
        </div>

        {/* Lista de resultados */}
        {results.length > 0 ? (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map(({ item }) => (
              <li key={`${item.sectionId}-${item.id}`}>
                <button
                  onClick={() => goTo(item)}
                  className="
                    w-full text-left px-4 py-2.5
                    hover:bg-gray-50 dark:hover:bg-[#111120]
                    flex items-center gap-3 transition-colors
                  "
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {item[lang]?.name || item.id}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {getSectionName(item.sectionId)} · {item[lang]?.subtitle}
                    </div>
                  </div>
                  {item.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-[#1a1a2e] text-gray-500 dark:text-gray-400 rounded shrink-0">
                      {tag}
                    </span>
                  ))}
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <div className="px-4 py-8 text-center text-sm text-gray-400">
            {lang === "es" ? `Sin resultados para "${query}"` : `No results for "${query}"`}
          </div>
        ) : (
          <div className="px-4 py-6 text-center text-xs text-gray-400">
            {lang === "es"
              ? "Escribí para buscar entre 350+ conceptos cripto"
              : "Type to search across 350+ crypto concepts"}
          </div>
        )}
      </div>
    </div>
  );
}
