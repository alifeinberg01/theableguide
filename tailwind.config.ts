import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand palette
        navy: {
          DEFAULT: "#1E3A5C",
          50: "#EEF2F8",
          100: "#D4E0EF",
          200: "#A9C1DF",
          300: "#7EA2CF",
          400: "#5383BF",
          500: "#2F6094",
          600: "#1E3A5C",
          700: "#162B44",
          800: "#0E1D2D",
          900: "#070E16",
        },
        teal: {
          DEFAULT: "#0891B2",
          50: "#ECFBFF",
          100: "#CDF4FC",
          200: "#9BE9F9",
          300: "#69DEF6",
          400: "#38CCF0",
          500: "#0FBBE6",
          600: "#0891B2",
          700: "#066B85",
          800: "#044758",
          900: "#02222B",
        },
        terra: {
          DEFAULT: "#C8603A",
          50: "#FDF4F0",
          100: "#FAE4DB",
          200: "#F5C9B7",
          300: "#EFAE93",
          400: "#E9936F",
          500: "#D4774D",
          600: "#C8603A",
          700: "#96482B",
          800: "#64301D",
          900: "#32180E",
        },
        sage: {
          DEFAULT: "#4A7C59",
          50: "#F0F7F2",
          100: "#D8EDE0",
          200: "#B1DBC1",
          300: "#8AC9A2",
          400: "#63B783",
          500: "#3CA564",
          600: "#4A7C59",
          700: "#375D43",
          800: "#253E2C",
          900: "#121F16",
        },
        amber: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        cream: {
          DEFAULT: "#FEFDF8",
          dark: "#F8F6EE",
        },
        cloud: "#F0F7FF",
        charcoal: {
          DEFAULT: "#1E293B",
          light: "#334155",
          muted: "#64748B",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 24px rgba(30, 58, 92, 0.08)",
        "card-hover": "0 8px 40px rgba(30, 58, 92, 0.16)",
        pill: "0 2px 12px rgba(30, 58, 92, 0.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
