/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gongde': {
          gold: '#D4AF37',
          red: '#8B0000',
          brown: '#3E2723',
          yellow: '#FFD700',
        },
      },
      backgroundImage: {
        'traditional-pattern': "url('/assets/pattern.png')",
      },
    },
  },
  plugins: [],
}
