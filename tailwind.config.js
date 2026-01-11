/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Refined Cyber-Organic Palette
        void: "#050505",
        surface: "#0a0a0a",
        "surface-highlight": "#151515",
        "surface-elevated": "#1a1a1a",

        // Primary: Electric Lime
        primary: "#d4ff00",
        "primary-dim": "#a8cc00",
        "primary-glow": "rgba(212, 255, 0, 0.15)",

        // Secondary: Deep Violet
        secondary: "#8b5cf6",
        "secondary-dim": "#7c3aed",

        // Accent: Cyan/Aqua
        accent: "#22d3ee",
        "accent-dim": "#06b6d4",

        // Additional accents
        rose: "#fb7185",
        amber: "#fbbf24",

        // Semantic
        success: "#34d399",
        warning: "#fbbf24",
        danger: "#f87171",

        // Text
        "text-main": "#fafafa",
        "text-muted": "#737373",
        "text-dim": "#525252",
      },
      fontFamily: {
        // Outfit for Headings/Display - clean, geometric, premium
        display: ["'Outfit'", "system-ui", "sans-serif"],
        // JetBrains Mono for UI elements, numbers, code
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Outfit'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px"
      },
      boxShadow: {
        "neon": "0 0 20px rgba(212, 255, 0, 0.25), 0 0 40px rgba(212, 255, 0, 0.1)",
        "neon-sm": "0 0 10px rgba(212, 255, 0, 0.2)",
        "neon-purple": "0 0 20px rgba(139, 92, 246, 0.25), 0 0 40px rgba(139, 92, 246, 0.1)",
        "neon-cyan": "0 0 20px rgba(34, 211, 238, 0.25)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.3)",
        "inner-glow": "inset 0 0 20px rgba(212, 255, 0, 0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 25s linear infinite reverse',
        'orbit-slow': 'orbit 35s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 7s infinite',
        'draw': 'draw 2s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'ripple': 'ripple 0.6s ease-out forwards',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(212, 255, 0, 0.2), 0 0 40px rgba(212, 255, 0, 0.1)',
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(212, 255, 0, 0.4), 0 0 60px rgba(212, 255, 0, 0.2)',
            transform: 'scale(1.02)'
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
