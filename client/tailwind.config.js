const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ranade", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: "transparent",
        forest: {
          100: "#F4F4F1",
          300: "#EBF2EA",
          400: "#DEE5DD",
          600: "#B6C4B4",
          700: "#36642F",
          800: "#244B1E",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
