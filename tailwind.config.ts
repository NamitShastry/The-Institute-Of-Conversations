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
        cream: {
          DEFAULT: "var(--cream)",
          50: "#FAF6F0",
          100: "var(--cream)", // #F3ECE0
          200: "#EADDCB",
        },
        sand: {
          light: "var(--sand-light)", // #E6D8C3
          DEFAULT: "var(--sand)", // #D9C3A5
          dark: "#C5AB89",
        },
        peach: {
          DEFAULT: "var(--peach)", // #F7B58A
          light: "#FCD8C1",
        },
        orange: {
          DEFAULT: "var(--orange)", // #F26A1B
          hover: "var(--orange-hover)", // #D85A12
          deep: "var(--orange-deep)", // #B8470F
        },
        rust: {
          DEFAULT: "var(--rust)", // #7A2E12
        },
        ink: {
          DEFAULT: "var(--ink)", // #1C1713
          soft: "var(--ink-soft)", // #5E5349
          muted: "#8C8075",
        },
        error: {
          DEFAULT: "var(--error)", // #B3261E
          bg: "#FDEDE8",
        },
      },
      fontFamily: {
        sans: ["'Inter Tight'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["'Inter Tight'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Geist Mono'", "'IBM Plex Mono'", "Menlo", "monospace"],
        serif: ["Georgia", "Cambria", "serif"], // only for italic pull-quotes/quotes
      },
      backgroundImage: {
        silk: "radial-gradient(120% 90% at 70% 60%, #F26A1B 0%, #D85A12 28%, #7A2E12 46%, transparent 62%), linear-gradient(115deg, #F3ECE0 0%, #E6D8C3 38%, #F7B58A 58%, #F26A1B 80%, #B8470F 100%)",
        'silk-soft': "linear-gradient(135deg, #F3ECE0 0%, #E6D8C3 40%, #F7B58A 75%, #F26A1B 100%)",
        'sand-radial': "radial-gradient(circle at 50% 50%, #F3ECE0 0%, #E6D8C3 50%, #D9C3A5 100%)",
      },
      boxShadow: {
        'orange-sm': '0 2px 8px rgba(242, 106, 27, 0.2)',
        'orange-glow': '0 0 25px rgba(242, 106, 27, 0.35)',
        'sand-flat': '0 2px 0 0 #D9C3A5',
        'subtle': '0 1px 3px rgba(28, 23, 19, 0.06), 0 1px 2px rgba(28, 23, 19, 0.04)',
        'card': '0 4px 12px rgba(28, 23, 19, 0.05)',
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.035em',
        'mono': '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
