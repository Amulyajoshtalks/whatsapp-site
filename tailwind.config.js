const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#090909",
        white: "#F6F6F6",
        darkPrimary: "#FEA002",
        lightPrimary: "#E73BCF",
        dark: "#33343F",
        error: colors.red[400],
        success: colors.green[500],
        info: colors.yellow[500],
        p_blue_light: "#0C60D0",
        p_blue_dark: "#2BC1E7",
      },
      fontFamily: {
        poppins: ["Helvetica Neue", "sans-serif"],
      },
      borderRadius: {
        primary: "40px",
      },
      gridTemplateColumns: {
        card: "repeat(auto-fit,minmax(324px,1fr))",
      },
      fontSize: {
        xxs: ['0.6rem'],
      },
      screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    },
    screens: {
      xs: "0px",      // X-Small: <576px (no infix, but you can use xs: for custom)
      sm: "576px",    // Small: ≥576px
      md: "768px",    // Medium: ≥768px
      lg: "992px",    // Large: ≥992px
      xl: "1200px",   // Extra large: ≥1200px
      xxl: "1400px",  // Extra extra large: ≥1400px
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp")
  ],
};