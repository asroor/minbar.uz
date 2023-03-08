export default {
  mode: "jit",
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
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
  plugins: [],
};
