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
          gold: "#F5C518",
          "gold-light": "#FFD738",
          "gold-dark": "#D4A30A",
          black: "#08090B",
          dark: "#0D0E12",
          card: "#131419",
          surface: "#181A21",
          border: "#232630",
          muted: "#8E93A0",
          bone: "#FFFFFF",
          stone: "#D1D5DF",
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
