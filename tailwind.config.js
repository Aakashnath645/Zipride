/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        zipYellow: '#FFD700',
        zipBlack: '#0A0A1A',
        zipDark: '#0A0A0F',
        zipGray: '#4A4A6A',
        zipAccent: '#6C63FF',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        'dash-flow': 'dash-flow 1s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'dash-flow': {
          to: { 'stroke-dashoffset': '-24' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
