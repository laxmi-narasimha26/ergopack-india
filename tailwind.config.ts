import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium neutrals - inspired by Apple, Rolex
        luxury: {
          white: '#FAFAFA',
          'off-white': '#F5F5F7',
          'light-gray': '#E8E8ED',
          'mid-gray': '#86868B',
          'dark-gray': '#1D1D1F',
          'space-black': '#0A0A0A',
        },
        // Premium Red - Deep Crimson & Ruby (replacing gold)
        crimson: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FEC9C9',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#9B1C1C', // Deep premium crimson - main brand color
          600: '#7F1D1D',
          700: '#6B1717',
          800: '#5A1414',
          900: '#4A1111',
        },
        // Deep burgundy - premium dark accent
        burgundy: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#F9CFD9',
          300: '#F4A8BA',
          400: '#ED7692',
          500: '#8B1538', // Deep burgundy
          600: '#701129',
          700: '#5C0E22',
          800: '#4E0D20',
          900: '#450C1F',
        },
        // Ruby - vibrant premium red
        ruby: {
          50: '#FFF1F1',
          100: '#FFE1E1',
          200: '#FFC7C7',
          300: '#FFA0A0',
          400: '#FF6B6B',
          500: '#CC0000', // Rich ruby red
          600: '#B00000',
          700: '#940000',
          800: '#7A0000',
          900: '#660000',
        },
        // Platinum - subtle luxury
        platinum: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
        // Legacy colors (kept for compatibility)
        primary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dae7',
          300: '#a7bcd1',
          400: '#7799b7',
          500: '#557a9f',
          600: '#426185',
          700: '#364f6c',
          800: '#30445b',
          900: '#2c3a4d',
          950: '#1d2633',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        // Existing animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        // Premium animations
        'luxury-fade': 'luxuryFade 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury-slide-up': 'luxurySlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury-scale': 'luxuryScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'elegant-glow': 'elegantGlow 3s ease-in-out infinite',
        'sophisticated-shimmer': 'sophisticatedShimmer 3s ease-in-out infinite',
        'reveal': 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
        'soft-bounce': 'softBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        // Premium keyframes
        luxuryFade: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        luxurySlideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        luxuryScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        elegantGlow: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        sophisticatedShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        softBounce: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'elegant': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
