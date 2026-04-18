/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './thankyou.html'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        surface: '#fcf5e5',
        'surface-low': '#fcf9ef',
        card: '#ffffff',
        primary: '#e4002b',
        'primary-shadow': '#4e0008',
        'primary-soft': '#ff7572',
        secondary: '#00743c',
        'secondary-section': '#037f59',
        'accent-pink': '#ff8eb2',
        'accent-green': '#71f69d',
        outline: '#bbb9b0',
        'on-surface': '#383831',
        'on-surface-muted': '#65655d',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
    },
  },
};
