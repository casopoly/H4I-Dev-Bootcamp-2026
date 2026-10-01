import type { Config } from "tailwindcss";

// DESIGN OWNER ONLY: this file defines the app's look (colors, fonts, etc.).
// Developers should use these tokens (e.g. `bg-brand-600`) and never hardcode values like `bg-[#ff5733]`.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand color (coffee). Use for buttons, links, highlights.
        brand: {
          50: "#faf6f1",
          100: "#f1e7da",
          200: "#e2cdb4",
          300: "#cfae88",
          400: "#bb8d60",
          500: "#a97545",
          600: "#8f5d36",
          700: "#734a2e",
          800: "#5e3d2a",
          900: "#4e3425",
        },
        // Page background and text colors.
        surface: "#fffaf3",
        ink: "#2b1d14",
      },
      fontFamily: {
        sans: ["Inter Variable", "system-ui", "sans-serif"],
        heading: ["Playfair Display Variable", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
