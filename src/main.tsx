// src/main.tsx
import * as React from "react";                // ✅ évite l’erreur TS1259 sans esModuleInterop
import { createRoot } from "react-dom/client"; // ✅ pas d'import par défaut (TS1192)
import App from "./App";
import "./index.css";

/** Applique le thème au niveau <html> + persiste */
export function applyTheme(theme: "dark" | "light")
{
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
}

// Déterminer le thème initial avant le rendu (évite le flash)
(function initTheme()
{
  try {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved ?? (prefersDark ? "dark" : "light"));
  } catch {
    /* noop */
  }
})();

// Synchroniser si le thème change dans un autre onglet
window.addEventListener("storage", (e) =>
{
  if (e.key === "theme" && (e.newValue === "dark" || e.newValue === "light")) {
    applyTheme(e.newValue);
  }
});

// API globale pour le toggle depuis App.tsx
(window as any).__toggleTheme = function ()
{
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
