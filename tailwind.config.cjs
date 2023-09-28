/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFFFFF',
          main: '#147BE5',
          dark: '#0B2538',
        },
        secondary: {
          light: '#F8F8F8',
          main: '#AFAFAF',
          dark: '#333333',
        },
      },
    },
  },
  plugins: [],
};
