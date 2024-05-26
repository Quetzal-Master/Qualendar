module.exports = {
  content: [
    './src/**/*.{js,jsx}', // adjust this path as needed
  ],
  theme: {
    extend: {
      colors: {
        'modern-black': '#2D2C37',
        'modern-dark-grey': '#1E1E2A',
        'modern-grey': '#1B1B1B',
        'modern-background': '#0A0C1D',
        'modern-primary': '#262935',
        'text-modern': '#B2B2B5',
        'text': '#e2def2',
        'background': '#06040c',
        'primary': '#a091dc',
        'secondary': '#3a2589',
        'accent': '#5839d1',
        'rose': 'rgba(202, 105, 218, 1)',
        'blue': 'rgba(138, 178, 253, 1)',
        'green': 'rgba(151, 213, 151, 1)',
        'yellow': 'rgba(253, 228, 138, 1)',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'quiksand': ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'date-card': '4px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      gridTemplateColumns: {
        'calendar': 'repeat(7, minmax(min-content, 1fr))',
      },
      scale: {
        '300': '3',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}