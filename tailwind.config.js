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
      spacing: {
        '128': '32rem',
        '148': '48rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
