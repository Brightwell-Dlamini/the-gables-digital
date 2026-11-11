import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0F2E1F",
          50: "#E8F0EB",
          100: "#C5D9CC",
          200: "#9BBFA8",
          300: "#6FA583",
          400: "#4A8C66",
          500: "#2E6B4A",
          600: "#1F4D36",
          700: "#0F2E1F",
          800: "#0A1F15",
          900: "#06140E",
        },
        sand: {
          DEFAULT: "#F3EFE6",
          50: "#FDFCFA",
          100: "#F9F6F0",
          200: "#F3EFE6",
          300: "#E8E0D0",
          400: "#D9CDB5",
          500: "#C4B496",
        },
        terracotta: {
          DEFAULT: "#D95F43",
          50: "#FDF4F2",
          100: "#FBE8E4",
          200: "#F6D0C8",
          300: "#EEA99A",
          400: "#E37B66",
          500: "#D95F43",
          600: "#C44A30",
          700: "#A33B26",
          800: "#873323",
          900: "#712F22",
        },
        ink: {
          DEFAULT: "#1A1714",
          muted: "#6B645C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 46, 31, 0.12)",
        "glass-sm": "0 4px 16px 0 rgba(15, 46, 31, 0.08)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "word-reveal": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.7s ease-out forwards",
        "word-reveal": "word-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
