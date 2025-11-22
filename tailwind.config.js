/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        nais: {
          primary: '#3b82f6', // blue-500
          secondary: '#8b5cf6', // violet-500
          accent: '#06b6d4', // cyan-500
          neutral: '#1f2937', // gray-800
          'base-100': '#ffffff',
          'base-200': '#f3f4f6', // gray-100
          'base-300': '#e5e7eb', // gray-200
          info: '#0ea5e9', // sky-500
          success: '#22c55e', // green-500
          warning: '#f59e0b', // amber-500
          error: '#ef4444', // red-500
        },
      },
      'winter',
      'cupcake',
      'nord',
    ],
    darkTheme: 'nord',
  },
};
