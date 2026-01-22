/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zen': {
          bg: '#F9F7F2',
          text: '#3D3D3D',
          gold: '#C5A059',
          green: '#8E9E82',
          pink: '#D9A7A7',
          container: 'rgba(255, 255, 255, 0.8)',
        },
      },
      borderRadius: {
        'zen': '24px',
      },
      backdropBlur: {
        'zen': '12px',
      },
      backgroundImage: {
        'traditional-pattern': "url('/assets/pattern.png')",
      },
    },
  },
  plugins: [],
}
