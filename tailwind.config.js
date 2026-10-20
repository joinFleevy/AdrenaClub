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
          gold: "#D49B2E",
          "gold-light": "#E5AE44",
          "gold-dark": "#B3801D",
          black: "#111215",
          dark: "#16171B",
          card: "#18191E",
          surface: "#1E2026",
          border: "#262830",
          muted: "#9CA3AF",
          bone: "#F4F5F7",
          stone: "#D1D5DB",
          crimson: "#DC2626",
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
