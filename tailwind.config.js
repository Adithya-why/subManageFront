/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        sandy: "#F5EEC8",
        sea: "#7bdff2",
      }
    },
  },
  plugins: [],
}

