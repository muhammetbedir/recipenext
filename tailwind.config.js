const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          colors: {
            background: "#FFFFFF",
            foreground: "#2A2C41",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#ff724c",
            },
            secondary: {
              foreground: "#FFFFFF",
              DEFAULT: "#fdbf50",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
}

