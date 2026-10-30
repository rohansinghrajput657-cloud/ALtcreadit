/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5F3EE',
        ink: '#13233A',
        muted: '#667085',
        borderHairline: '#E3DFD6',
        tierGreen: '#0E7A4B',
        tierAmber: '#B7791F',
        tierRed: '#C0392B',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'bento': '14px',
      }
    },
  },
  plugins: [],
}
