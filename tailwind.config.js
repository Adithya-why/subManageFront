/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        sandy: "#faedcd",
        sea: "#7bdff2",
        pgreen: "#60d394",
        lbrown: "#d4a373",
      }
    },
  },
  plugins: [],
}

