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
        // Primary brand palette (Harbor Brass — deep navy + brass gold)
        terra: {
          DEFAULT: "#C79A4B",
          50: "#FBF7EE",
          100: "#F5EBD6",
          200: "#E9D4AA",
          300: "#DCBD7E",
          400: "#D2AC63",
          500: "#C79A4B",
          600: "#A97C2E",
          700: "#8A6320",
          800: "#5F4416",
          900: "#38280D",
        },
        sage: {
          DEFAULT: "#5C89B0",
          50: "#F1F6FA",
          100: "#DFEAF3",
          200: "#C3D9EA",
          300: "#A7C7E1",
          400: "#7CA8CC",
          500: "#5C89B0",
          600: "#486D8E",
          700: "#37546D",
          800: "#263B4D",
          900: "#16232E",
        },
        dust: {
          DEFAULT: "#6FA8D8",
          50: "#F0F7FC",
          100: "#DCEDF7",
          200: "#B9DBF0",
          300: "#96C9E8",
          400: "#82B9DE",
          500: "#6FA8D8",
          600: "#4A87BC",
          700: "#386A97",
          800: "#294D6E",
          900: "#1B3349",
        },
        // Legacy keys kept so existing component classes keep resolving,
        // remapped onto the new palette's deep-navy neutral.
        navy: {
          DEFAULT: "#16273D",
          50: "#F0F3F7",
          100: "#DEE5EC",
          200: "#B8C7D6",
          300: "#92A9C0",
          400: "#5C7994",
          500: "#37536F",
          600: "#26405A",
          700: "#1D3149",
          800: "#16273D",
          900: "#0D1826",
        },
        teal: {
          DEFAULT: "#6FA8D8",
          50: "#F0F7FC",
          100: "#DCEDF7",
          200: "#B9DBF0",
          300: "#96C9E8",
          400: "#82B9DE",
          500: "#6FA8D8",
          600: "#4A87BC",
          700: "#386A97",
          800: "#294D6E",
          900: "#1B3349",
        },
        amber: {
          DEFAULT: "#D2833F",
          50: "#FBF1E6",
          100: "#F5E1CC",
          200: "#EAC49C",
          300: "#DFA76C",
          400: "#D89552",
          500: "#D2833F",
          600: "#A9691F",
          700: "#7F4F17",
          800: "#56350F",
          900: "#2E1B08",
        },
        cream: {
          DEFAULT: "#F8F5EC",
          dark: "#F1EAD3",
        },
        cloud: "#F1EAD3",
        charcoal: {
          DEFAULT: "#16273D",
          light: "#22344C",
          muted: "#5B6A7E",
        },
        border: "#E4DBC4",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "0.875rem",
        "3xl": "1.375rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 12px rgba(22, 39, 61, 0.07)",
        "card-hover": "0 6px 32px rgba(22, 39, 61, 0.10)",
        pill: "0 4px 16px rgba(199, 154, 75, 0.25)",
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
