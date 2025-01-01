module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  
  theme: {
    extend: {
      colors: {
        'bg-gray-800': '#1f2937',
        'light-cyan': 'rgb(102, 231, 231)',
      },
    },
  },



    
  plugins: [],
};
