/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        xs6: '.6rem',
        xs5: '.5rem',
        xs25: '.25rem'
      },
      colors: {
        'molecule-blue': '#01213A',
        'molecule-aqua': '#00D5C8',
        'molecule-purple': '#7000FF',
        'molecule-green': '#00A79D',
        'molecule-bluegrey': '#5D86A4',
        'molecule-lightgrey': '#D5E3ED',
        // TODO: Rename
        'molecule-blueish': '#3178af',
        'molecule-giflogo': '#FCFCFE' 
      },
      dropShadow: {
        '3xl-white': '0 15px 15px rgba(255,255,255, 0.3)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  plugins: [],
}