/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'clash': ['Clash Display', 'sans-serif'],
        // إضافة السطر التالي لتعريف General Sans
        'general': ['General Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}