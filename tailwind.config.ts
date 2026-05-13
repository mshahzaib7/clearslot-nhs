import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nhs: {
          navy: "#003087",
          blue: "#005EB8",
          lightBlue: "#41B6E6",
          green: "#007F3B",
          amber: "#FFB81C",
          red: "#DA291C",
          grey: "#F0F4F5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
