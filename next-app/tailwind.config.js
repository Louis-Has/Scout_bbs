/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontWeight: {
        heavy: 900,
      },
      colors: {
        mainGreen: '#0FB77A',
        linLightGray: '#D1D5DC',
        textDeep: '#353B45',
        textDeep01: '#5B626D',
        textDeep02: '#8F949D',
        textWhite: '#FFFFFF',
        textRed: '#F53F3F',
        fillDeep: '#1E2022',
        fillLight: '#F8F9FB',
      },
    },
  },
  plugins: [],
}
