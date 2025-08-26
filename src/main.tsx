// @filename: src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// ✅ CORRECTION : Chemin d'importation corrigé pour être relatif au dossier src.
import "./index.css";

/**
 * Applique le thème au niveau <html> (classe 'dark' ou 'light')
 * + persiste dans localStorage + synchronise entre onglets.
 */
export function applyTheme(theme: "dark" | "light")
{
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
}

// 1) Déterminer le thème initial avant le rendu React (évite le flash)
(function initTheme()
{
  const stored = (localStorage.getItem("theme") as "dark" | "light" | null);
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored ?? (prefersDark ? "dark" : "light"));
})();

// 2) Synchroniser si le thème change dans un autre onglet
window.addEventListener("storage", (e) =>
{
  if (e.key === "theme" && (e.newValue === "dark" || e.newValue === "light")) {
    applyTheme(e.newValue as "dark" | "light");
  }
});

// 3) API globale pour basculer le thème depuis App.tsx
(window as any).__toggleTheme = function ()
{
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
