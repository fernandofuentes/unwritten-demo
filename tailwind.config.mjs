/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
        black: '900',
      },
      fontSize: {
        'base': ['16px', {
          lineHeight: '24px',
        }],
        'hero': ['clamp(3rem, 8vw, 100px)', { // This makes the font size responsive
          lineHeight: '1',
        }],
        'section': ['clamp(2rem, 5vw, 38px)', { // Also making section headers responsive
          lineHeight: '1.1',
        }]
      },
      colors: {
        primary: "#00FFFF",
        secondary: "#FF00FF",
        dark: '#0d0d0d',
        body: '#0d0d0d'
      }
    },
  },
  plugins: [],
}