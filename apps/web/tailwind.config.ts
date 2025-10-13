import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{astro,tsx,ts,jsx,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "hsl(var(--brand))",
          fg: "hsl(var(--brand-fg))",
        },
      },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [],
} satisfies Config;
