// @filename: tailwind.config.ts

import type { Config } from 'tailwindcss';

export default {
  // ✅ CORRECTION : Ajout de la stratégie pour le mode sombre.
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
