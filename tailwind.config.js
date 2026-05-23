/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      colors: {
        shell: '#121110',
        'shell-muted': '#a8a29e',
        canvas: '#f4f2ed',
        ink: '#1c1917',
        body: '#44403c',
        line: '#e7e5e0',
        accent: '#c9a227',
        'accent-hover': '#e8c547',
        forest: '#2f5d50',
      },
      fontSize: {
        hero: [
          'clamp(2.75rem,7vw,4rem)',
          { lineHeight: '0.95', letterSpacing: '-0.04em' },
        ],
      },
    },
  },
  plugins: [],
};
