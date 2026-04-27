import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:  "#FAF6EF",
        cream2: "#F3EDE0",
        bark:   "#1E2D1A",
        bark2:  "#2C3E27",
        terra:  "#C4622D",
        terra2: "#A8501F",
        gold:   "#D4A843",
        gold2:  "#B8922E",
        sage:   "#4A7C59",
        sage2:  "#3A6347",
        sand:   "#E8D5B0",
        sand2:  "#D4BC8A",
      },
      fontFamily: {
        serif: ["DM Serif Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
