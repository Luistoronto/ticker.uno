// src/app/page.jsx
// La página raíz "/" redirige a "/mapa" automáticamente.

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/mapa");
}
