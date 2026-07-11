// src/components/Footer.jsx
// ─────────────────────────────────────────────────────────────
// Pie de página global del sitio.
// Aparece en TODAS las páginas porque se importa desde layout.jsx
// ─────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Marca + copyright */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
          <p className="font-semibold text-gray-700 dark:text-gray-300">
            ticker.uno
          </p>
          <p>© {year} ticker.uno — Todos los derechos reservados.</p>
        </div>

        {/* Contacto */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Contacto:</span>
          <a
            href="mailto:hi@ticker.uno"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            hi@ticker.uno
          </a>
        </div>
      </div>
    </footer>
  );
}
