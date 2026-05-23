/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Spectral', 'Georgia', 'serif'],
        sans: ['Work Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: '#f0e9de',
        ink: '#1f1812',
        'ink-muted': '#5a5248',
        rust: '#a63d2d',
        'rust-deep': '#7d2e22',
        cream: '#faf6ef',
      },
      fontSize: {
        'display': ['clamp(2.35rem,5vw,3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};
