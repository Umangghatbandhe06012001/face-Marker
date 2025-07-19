/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",    
    "./components/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      screens: {
        max768: { max: "768px" }, 
      },
    },
  },
  plugins: [],
}
