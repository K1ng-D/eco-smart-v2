import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        loginbg: "url('/assets/image/pameran.jpeg')",
        productpage: "url('/assets/image/produkKami.jpeg')",
        newspage: "url('/assets/image/Berita.jpeg')",
        pameranbg: "url('/assets/image/pameran.jpeg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
