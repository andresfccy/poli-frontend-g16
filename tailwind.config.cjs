/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#112033',
        slate: '#49617D',
        cream: '#F8F3EA',
        coral: '#F26A4B',
        teal: '#0F8B8D',
        sand: '#E7D7C1',
        gold: '#F3B63A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(17, 32, 51, 0.12)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(242, 106, 75, 0.28), transparent 32%), radial-gradient(circle at bottom right, rgba(15, 139, 141, 0.22), transparent 28%)',
      },
    },
  },
  plugins: [],
};
