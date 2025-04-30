 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js}"],
  plugins: [],
}


const config = {
  darkMode: "class",
  content: ["./src/**/*.{html,scss,ts}"],
  options: {
    safelist: ["active"],
  },
  theme: {
    extend: {
      colors: {
        primary: "var(--theme-primary)",
        secondary: "var(--theme-secondary)",
        warn: "var(--theme-warn)",
      },

    },
  },
  plugins: [],
}


module.exports = config;