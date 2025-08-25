import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)', // ta couleur principale définie dans index.css
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
