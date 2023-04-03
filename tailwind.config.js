/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        0: "#191919",
        5: "#202020",
        10: "#2a2a2a",
        15: "#666666",
        20: "#ddd",
      },
      neutral: {
        dark: "#000000",
        light: "#fff",
      },
    },
    fontFamily: {
      muli: ["Muli", "sans-serif"],
      futura: ["Futura", "sans-serif"],
      mrsSaint: ["MrsSaintDelafield", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};
