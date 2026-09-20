/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        doom: {
          950: '#06120e', // Deep dark cinematic base
          900: '#011d16',
          850: '#03241c',
          800: '#052b21',
          700: '#08382c',
          bg: '#06120e',
          text: '#7D9AA3', // User specified text color #7D9AA3
          outline: '#427F40', // User specified text outline #427F40
          emerald: '#7D9AA3', // Remapped to user theme text color
          green: '#427F40', // Remapped to user theme outline color
          toxic: '#427F40',
          lime: '#7D9AA3',
          forest: '#06120e',
          darkgreen: '#06120e',
          gold: '#F59E0B',
          arcane: '#8B5CF6',
          cyan: '#7D9AA3',
          metal: '#7D9AA3',
          crimson: '#7D9AA3',
          scarlet: '#427F40',
        },
      },
      fontFamily: {
        corpta: ['Corpta', 'Outfit', 'sans-serif'],
        comic: ['Corpta', 'Impact', 'Trebuchet MS', 'sans-serif'],
        display: ['Corpta', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px #000000',
        'comic-lg': '6px 6px 0px 0px #000000',
        'comic-crimson': '4px 4px 0px 0px #059669',
        'comic-green': '4px 4px 0px 0px #10B981',
        'comic-emerald': '4px 4px 0px 0px #047857',
        'comic-glow': '0 0 25px -4px rgba(16, 185, 129, 0.55)',
        'emerald-glow': '0 0 35px -5px rgba(16, 185, 129, 0.65)',
        'toxic-glow': '0 0 45px -4px rgba(34, 197, 94, 0.75)',
        'smoke-glow': '0 0 70px 20px rgba(5, 150, 105, 0.3)',
        'arcane-glow': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
      },
      backgroundImage: {
        'halftone': 'radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 0)',
        'grid-pattern': 'linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
        'smoke-gradient': 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.08) 40%, transparent 70%)',
      },
      backgroundSize: {
        'halftone': '12px 12px',
        'grid': '24px 24px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 0.4s ease-in-out',
        'smoke-drift-1': 'smokeDrift1 22s ease-in-out infinite alternate',
        'smoke-drift-2': 'smokeDrift2 28s ease-in-out infinite alternate',
        'smoke-drift-3': 'smokeDrift3 18s ease-in-out infinite alternate',
        'green-pulse': 'greenPulse 4s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(3px, 1px)' },
          '80%': { transform: 'translate(1px, -2px)' },
        },
        smokeDrift1: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translate(40px, -25px) scale(1.15)', opacity: '0.6' },
          '100%': { transform: 'translate(-30px, 30px) scale(0.95)', opacity: '0.35' },
        },
        smokeDrift2: {
          '0%': { transform: 'translate(0, 0) scale(1.1)', opacity: '0.25' },
          '50%': { transform: 'translate(-50px, 35px) scale(0.9)', opacity: '0.5' },
          '100%': { transform: 'translate(35px, -40px) scale(1.2)', opacity: '0.25' },
        },
        smokeDrift3: {
          '0%': { transform: 'translate(0, 0) scale(0.95)', opacity: '0.3' },
          '50%': { transform: 'translate(25px, 45px) scale(1.1)', opacity: '0.55' },
          '100%': { transform: 'translate(-40px, -20px) scale(1)', opacity: '0.3' },
        },
        greenPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
