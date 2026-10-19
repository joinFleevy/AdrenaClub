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
          gold: "#F7B72F",
          "gold-light": "#FFC94D",
          "gold-dark": "#D49514",
          black: "#0A0A0B",
          dark: "#121215",
          card: "#19191D",
          border: "#2A2A30",
          muted: "#8A8A93",
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Outfit', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Barlow Condensed', 'Cairo', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Cairo', 'sans-serif'],
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
