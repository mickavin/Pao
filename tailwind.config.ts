import type { Config } from "tailwindcss"
import fontFamily from "tailwindcss/defaultTheme"
const config = {
  darkMode: ["class", ".dark-mode"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7ED6A5",
          dark: "#5EB985",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#A2DDF5",
          dark: "#7BCBEB",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FBCFD6",
          dark: "#F8A8B4",
          foreground: "#2E2E2E",
        },
        success: {
          DEFAULT: "#7ED6A5",
          dark: "#5EB985",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FFD166",
          dark: "#FFC233",
          foreground: "#2E2E2E",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        soft: "0 4px 14px 0 rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", ...fontFamily.fontFamily.sans],
        nunito: ["var(--font-nunito)", ...fontFamily.fontFamily.sans],
        poppins: ["var(--font-poppins)", ...fontFamily.fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #7ED6A5 0%, #A5E4C1 100%)",
        "gradient-secondary": "linear-gradient(135deg, #A2DDF5 0%, #C1E9F9 100%)",
        "gradient-accent": "linear-gradient(135deg, #FBCFD6 0%, #FDDEE3 100%)",
        "gradient-success": "linear-gradient(135deg, #7ED6A5 0%, #A5E4C1 100%)",
        "gradient-warning": "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
        "gradient-destructive": "linear-gradient(135deg, #F87171 0%, #FCA5A5 100%)",
        "pattern-dots": "radial-gradient(#7ED6A5 1px, transparent 1px)",
        "pattern-lines": "linear-gradient(to right, #E6E4E2 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
