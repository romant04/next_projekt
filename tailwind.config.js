/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#040051",
        primary: "#0d339e",
        secondary: "#00bbff",
        accent: "#ddc700",
      },
    },
  },
  plugins: [],
};
