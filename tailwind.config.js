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
        tierGreenLight: '#3AA76A',
        tierAmber: '#B7791F',
        tierAmberLight: '#D49B44',
        tierRed: '#C0392B',
        tierRedLight: '#E05847',
        accentGold: '#C9A86A',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'bento': '18px',
        'card': '18px',
      }
    },
  },
  plugins: [],
}
