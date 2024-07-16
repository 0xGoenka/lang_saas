/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {},
    colors: {
      dark: "#0A0F1C",
      darkBlue: "#253745",
      grey: "#84878D",
      lightGrey: "#E6E7E8",
      white: "#FFFFFF",
      blue: "#4293D2",
      green: "#2FA466",
      start: "#4094D1",
      middle: "#7278DF",
      end: "#78BCE7",
    },
    text: {
      base: "16px",
      sm: "12px",
      md: "24px",
      lg: "32px",
    },
  },
  plugins: [],
};

// bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
