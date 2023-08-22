/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { opacity: "0" },

          "20%": { opacity: "1" },
        },
      },
      animation: {
        "waving-hand": "wave 2s linear",
      },
    },
  },
  plugins: [],
};
