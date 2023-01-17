/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        basePurple: '#333366',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
