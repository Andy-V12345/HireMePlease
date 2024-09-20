/** @type {import('tailwindcss').Config} */
export default {
  content: [
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
  plugins: [],
}