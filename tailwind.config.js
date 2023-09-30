/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { height: "0" },

          "100%": { height: "50%" },
        },
      },
      animation: {
        "easi-en": "ease-in 0.3s infinite ",
      },
    },
  },
  plugins: [],
};
