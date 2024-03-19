/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        main: '#0053AC',
        'dark-main': '#0070CC',
        'dark-modal': '#0D1117',
        'hover-blue': '#006BC2',
        'hover-light-blue': '#0080E7',
        'black-base': '#444444',
        'white-base': '#D0D0D0',
      },
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      raleway: ['Raleway', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      quicksand: ['Quicksand', 'sans-serif'],
    },
  },
  plugins: [],
}
