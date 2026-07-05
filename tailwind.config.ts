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
        // Primary brand palette (warm terra / sage / dust)
        terra: {
          DEFAULT: "#C4714A",
          50: "#FDF7F3",
          100: "#FAF0EA",
          200: "#EEC9B2",
          300: "#E4B49B",
          400: "#D9936E",
          500: "#C4714A",
          600: "#A05838",
          700: "#7D4329",
          800: "#5A2F1D",
          900: "#321A10",
        },
        sage: {
          DEFAULT: "#6B8F6E",
          50: "#EEF5EE",
          100: "#DCEBDC",
          200: "#B8D4BB",
          300: "#94BD9E",
          400: "#6B8F6E",
          500: "#6B8F6E",
          600: "#4F6E52",
          700: "#3D5540",
          800: "#2B3D2E",
          900: "#19241B",
        },
        dust: {
          DEFAULT: "#7A9BB5",
          50: "#EBF2F8",
          100: "#D7E5F1",
          200: "#AFCBE3",
          300: "#98B9D4",
          400: "#7A9BB5",
          500: "#7A9BB5",
          600: "#5F7F9B",
          700: "#4A6580",
          800: "#354A5F",
          900: "#202D3A",
        },
        // Legacy keys kept so existing component classes keep resolving,
        // remapped onto the new palette's dark neutral + dust accent.
        navy: {
          DEFAULT: "#28201A",
          50: "#F5F2EF",
          100: "#E8E0D9",
          200: "#D1C1B3",
          300: "#B39F8A",
          400: "#8F7860",
          500: "#6B5642",
          600: "#4A3B2C",
          700: "#382D22",
          800: "#28201A",
          900: "#1A140F",
        },
        teal: {
          DEFAULT: "#7A9BB5",
          50: "#EBF2F8",
          100: "#D7E5F1",
          200: "#AFCBE3",
          300: "#98B9D4",
          400: "#7A9BB5",
          500: "#7A9BB5",
          600: "#5F7F9B",
          700: "#4A6580",
          800: "#354A5F",
          900: "#202D3A",
        },
        amber: {
          DEFAULT: "#EFC36A",
          50: "#FEF9EC",
          100: "#FDF0CE",
          200: "#FBE29D",
          300: "#F8D67F",
          400: "#EFC36A",
          500: "#E8B34D",
          600: "#D19A34",
          700: "#A87826",
          800: "#7A571C",
          900: "#4D3712",
        },
        cream: {
          DEFAULT: "#FDF9F5",
          dark: "#F5EDE2",
        },
        cloud: "#F5EDE2",
        charcoal: {
          DEFAULT: "#28201A",
          light: "#3D3028",
          muted: "#7A6A58",
        },
        border: "#E8DDD0",
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
        card: "0 2px 12px rgba(40, 32, 26, 0.07)",
        "card-hover": "0 6px 32px rgba(40, 32, 26, 0.10)",
        pill: "0 4px 16px rgba(196, 113, 74, 0.20)",
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
