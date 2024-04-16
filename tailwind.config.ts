import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        scheme: {
          green: "#23432c",
        },
      },
      fontSize: {
        "h1-clamp": "clamp(1.5rem, 5vw, 3rem)",
        "h2-clamp": "clamp(1rem, 5vw, 3rem)",
        "h3-clamp": "clamp(1.2rem, 4vw, 2.5rem)",
        "h4-clamp": "clamp(1.1rem, 3.5vw, 2.2rem)",
        "p-clamp": "clamp(0.6rem, 3vw, 1rem)",
      },
    },
  },
  plugins: [],
};
export default config;
