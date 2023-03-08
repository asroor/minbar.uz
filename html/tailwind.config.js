module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./www/*.html", "./www/js/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "sm-down": { max: "640px" },
      },
      colors: {
        body: "#1d1d1b",
        primary: "#37b21f",
        accent: "#e1261d",
        muted: "#80807f",
        success: "#2dad16",
        warning: "#ffc400",
        border: "#ccd3ea",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["PT Serif", "serif"],
      },
      borderWidth: {
        3: "3px",
      },
      padding: {
        18: "4.5rem",
        25: "6.25rem",
      },
      margin: {
        25: "6.25rem",
      },
      minHeight: {
        btn: "50px",
      },
      borderColor: {
        DEFAULT: "#e5e7eb",
      },
    },
  },
  variants: {
    extend: {
      fill: ["hover", "focus"],
      textColor: ["visited"],
      backgroundImage: ["hover", "focus"],
      backgroundBlendMode: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
