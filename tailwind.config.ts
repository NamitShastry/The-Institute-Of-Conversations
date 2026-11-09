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
          DEFAULT: "var(--cream)", // #F3EEE3
          deep: "var(--cream-deep)", // #EAE3D3
        },
        paper: "var(--paper)", // #FBF9F4
        ink: {
          DEFAULT: "var(--ink)", // #111111
          soft: "var(--ink-soft)", // #55514A
          muted: "var(--ink-muted)", // #8A857B
        },
        orange: {
          DEFAULT: "var(--orange)", // #D9541E
          strong: "var(--orange-strong)", // #C74817
          hover: "var(--orange-hover)", // #B03F12
          deep: "var(--orange-deep)", // #B8431A
          tint: "var(--orange-tint)", // #F6DCCB
        },
        ember: "var(--ember)", // #7A2A0E
        error: "var(--error)", // #B3261E
        line: {
          DEFAULT: "var(--line)",
          dark: "var(--line-on-dark)",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["'Inter Tight'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "'Geist Mono'", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(17,17,17,.06), 0 12px 32px rgba(17,17,17,.08)",
        card: "0 1px 3px rgba(17,17,17,.06), 0 4px 16px rgba(17,17,17,.04)",
        "card-hover": "0 4px 12px rgba(17,17,17,.08), 0 16px 36px rgba(17,17,17,.10)",
        panel: "0 8px 30px rgba(17,17,17,.08)",
      },
      borderRadius: {
        card: "16px",
        panel: "20px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.035em",
        mono: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
