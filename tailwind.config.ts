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
        // Primary brand palette (calm blues)
        terra: {
          DEFAULT: "#4A7A96",
          50: "#F3F8FA",
          100: "#E4EFF4",
          200: "#C2DBE6",
          300: "#A3C7D8",
          400: "#6F9FB8",
          500: "#4A7A96",
          600: "#396178",
          700: "#2C4B5D",
          800: "#203642",
          900: "#142128",
        },
        sage: {
          DEFAULT: "#6699A8",
          50: "#EFF6F8",
          100: "#DCEBEF",
          200: "#B8D6DE",
          300: "#94C1CD",
          400: "#6699A8",
          500: "#6699A8",
          600: "#4F7D8A",
          700: "#3D616B",
          800: "#2A454D",
          900: "#182830",
        },
        dust: {
          DEFAULT: "#8AB4D4",
          50: "#F1F7FB",
          100: "#E2EEF6",
          200: "#C5DDED",
          300: "#A8CCE4",
          400: "#8AB4D4",
          500: "#8AB4D4",
          600: "#6C93B3",
          700: "#557391",
          800: "#3E5468",
          900: "#283645",
        },
        // Legacy keys kept so existing component classes keep resolving,
        // remapped onto the new palette's dark neutral + dust accent.
        navy: {
          DEFAULT: "#1E2A38",
          50: "#F1F4F7",
          100: "#E1E8ED",
          200: "#C3D1DA",
          300: "#A5BAC8",
          400: "#7891A3",
          500: "#5A7184",
          600: "#445766",
          700: "#33424D",
          800: "#232D36",
          900: "#161C22",
        },
        teal: {
          DEFAULT: "#8AB4D4",
          50: "#F1F7FB",
          100: "#E2EEF6",
          200: "#C5DDED",
          300: "#A8CCE4",
          400: "#8AB4D4",
          500: "#8AB4D4",
          600: "#6C93B3",
          700: "#557391",
          800: "#3E5468",
          900: "#283645",
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
          DEFAULT: "#F7FAFC",
          dark: "#E9F1F6",
        },
        cloud: "#E9F1F6",
        charcoal: {
          DEFAULT: "#1E2A38",
          light: "#2C3E50",
          muted: "#5A7184",
        },
        border: "#D7E3EC",
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
        card: "0 2px 12px rgba(30, 42, 56, 0.07)",
        "card-hover": "0 6px 32px rgba(30, 42, 56, 0.10)",
        pill: "0 4px 16px rgba(74, 122, 150, 0.20)",
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
