/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#081220',
          royal: '#0E1E36',     // Pantone 296 C - Primary Deep Surface
          elevated: '#0F1C30',  // Pantone 533 C - Elevated Surface
          surface: '#13233E',
          border: 'rgba(200, 155, 67, 0.22)',
        },
        gold: {
          dark: '#9A7228',
          royal: '#C89B43',     // Pantone 7556 C
          metallic: '#C5A059',  // Pantone 7555 C / Foil 871 C
          champagne: '#E6C77B', // Pantone 7403 C
          light: '#F5E4B8',
          foil: '#FDF9F2',
        },
        roast: {
          espresso: '#3B1E0A', // Pantone 4625 C
          deep: '#3D2314',
          subtle: 'rgba(59, 30, 10, 0.75)',
        },
        alabaster: {
          cotton: '#FAF6EE',   // Pantone 7527 C (400gsm cotton paper)
          ivory: '#FDF9F2',    // Pantone 7527 C Tint
          aged: '#F4ECE0',
        }
      },
      fontFamily: {
        amiri: ['"Amiri"', 'serif'],
        tajawal: ['"Tajawal"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'foil': '0 0 25px rgba(200, 155, 67, 0.28), inset 0 1px 2px rgba(253, 249, 242, 0.4)',
        'letterpress': 'inset 1px 1px 2px rgba(59, 30, 10, 0.18), 0 1px 0 rgba(255, 255, 255, 0.8)',
        'letterpress-dark': 'inset 1px 1px 3px rgba(0, 0, 0, 0.6), 0 1px 1px rgba(200, 155, 67, 0.25)',
        'palace': '0 25px 60px -15px rgba(8, 18, 32, 0.7), 0 0 0 1px rgba(200, 155, 67, 0.18)',
        'card-elevated': '0 20px 45px -10px rgba(14, 30, 54, 0.5), 0 0 0 1px rgba(200, 155, 67, 0.3)',
      },
      animation: {
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'steam-slow': 'steam 6s ease-in-out infinite',
        'steam-fast': 'steam 4s ease-in-out infinite 1s',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.2' },
          '50%': { transform: 'translateY(-18px) scaleX(1.15)', opacity: '0.7' },
          '100%': { transform: 'translateY(-36px) scaleX(0.9)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.92', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
