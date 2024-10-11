const { nextui } = require("@nextui-org/theme")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/components/pagination.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-teal": "#229799",
        "primary-gray": "#424242",
        "secondary-gray": "#F5F5F5",
        "secondary-teal": "#48CFCB"
      }
    },
  },
  plugins: [nextui()],
}