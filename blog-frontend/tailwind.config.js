/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#aeb3b9",
      },
      backgroundColor: {
        base: "#1867c2",
        card: "#313338",
        input: "#1e1f22",
        "btn-primary": "#2196f3",
      },
      boxShadow: {
        drop: "0 3px 1px -2px rgba(0, 0, 0, .2),0 2px 2px 0 rgba(0, 0, 0, .14),0 1px 5px 0 rgba(0, 0, 0, .12)",
      },
    },
  },
  plugins: [],
};
