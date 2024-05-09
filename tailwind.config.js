/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'login-background': "url('/src/assets/cloudblur.jpg')",
      }
    },
  },
  plugins: [],
  resolve: {
    fallback: {
      net: false,
    },
  },
}