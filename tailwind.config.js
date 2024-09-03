/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#FCF8F3", // Bej renk
        foreground: "#2A2C41",
        primary: {
          foreground: "#fff",
          DEFAULT: "#ff724c",
        },
        secondary: {
          foreground: "#fff",
          DEFAULT: "#F48E28",
          dark: "#C15B00",
          background: "#FEFAF6",
        },
        focus: "#BEF264",
        buttonHoverBg: "#793e37",
        customColor2: "#974e44",
        buttonBg: "#b55d51",
        customColor4: "#fff0ed",
        customColor5: "#4c4c4c",
        customColor6: "#878787",
        customColor7: "#a5a5a5",
        customColor8: "#ebebeb",
        customColor9: "#000000",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
