/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#ECE3D4',
          400: '#DFD2BC',
          500: '#CDBCA1',
          600: '#B09E81',
          700: '#8C7A5E',
          800: '#64543C',
          900: '#3D3120',
        },
        ink: {
          950: '#070B12',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
        },
        obsidian: {
          950: '#FAF7F2',
          900: '#F4EFE6',
          850: '#ECE3D4',
          800: '#E4D8C4',
          700: '#D5C5AC',
          600: '#BDB09A',
        },
        gold: {
          50: '#FDF9EE',
          100: '#FBF0D5',
          200: '#F5DE9F',
          300: '#EBCB6B',
          400: '#C59B27',
          500: '#A67C18',
          600: '#845D12',
          700: '#63440B',
        },
        champagne: {
          light: '#FDFBF7',
          DEFAULT: '#F5EFEB',
          dark: '#E2DACD',
        },
        bronze: {
          DEFAULT: '#8C6D37',
          dark: '#5F4820',
        },
        emeraldGlow: {
          DEFAULT: '#059669',
          light: '#10B981',
        }
      },
      fontFamily: {
        google: ['"Outfit"', '"Lexend"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Syne"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(212, 175, 87, 0.12) 0%, transparent 65%)',
        'subtle-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'hero-gradient': 'linear-gradient(180deg, rgba(8, 13, 24, 0.4) 0%, rgba(8, 13, 24, 0.85) 60%, #080D18 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FBF8EF 0%, #D4AF57 50%, #A67C18 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
