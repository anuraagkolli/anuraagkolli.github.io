import type { Config } from "tailwindcss"

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        offwhite: "var(--offwhite)",
        offblack: "var(--offblack)",
        gray: {
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
        },
        accent: "var(--accent)",
      },
      fontFamily: {
        // The site is set in one typeface. `ui` stays as a named role for
        // titles so the distinction survives if the faces ever diverge again.
        ui: ["var(--prose-stack)"],
        prose: ["var(--prose-stack)"],
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
