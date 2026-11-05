/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        adrena: {
          gold: "#F59E0B",
          "gold-light": "#FBBF24",
          "gold-dark": "#D97706",
          black: "#0F172A",
          dark: "#1E293B",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          surface: "#F1F5F9",
          border: "#E2E8F0",
          muted: "#64748B",
          bone: "#0F172A",
          stone: "#475569",
          crimson: "#EF4444",
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Cairo', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.015em',
        normal: '0',
        wide: '0.03em',
        wider: '0.06em',
        widest: '0.12em',
      },
    },
  },
  plugins: [],
};
