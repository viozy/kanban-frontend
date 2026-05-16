/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#242430',
        },
        purple: {
          500: '#7c3aed',
          600: '#6d28d9',
          400: '#a78bfa',
        }
      }
    },
  },
  plugins: [],
};
