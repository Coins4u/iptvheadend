import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0d5c45",
          hover: "#0a4a37",
          dark: "#083d2e",
          light: "#eef8f3",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
