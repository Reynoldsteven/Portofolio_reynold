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
        background: "var(--background)",
        card: "var(--bg-card)",
        "accent-purple": "#8b5cf6",   /* violet-500 (modern) */
        "accent-violet": "#6366f1",   /* indigo-500 (modern) */
        "accent-glow":   "#a78bfa",   /* violet-400 */
        "accent-blue":   "#3b82f6",   /* blue-500 (aurora accent) */
        "accent-green":  "#10b981",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "blur(80px)" },
          "50%":      { opacity: "0.9", filter: "blur(100px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #8b5cf6, #6366f1)",
      },
    },
  },
  plugins: [],
};
export default config;
