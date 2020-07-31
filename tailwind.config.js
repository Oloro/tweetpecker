module.exports = {
  purge: [
    './pages/**/*.vue',
    './components/**/*.vue',
    './plugins/**/*.vue',
    './static/**/*.vue',
    './store/**/*.vue'
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width'
      },
      margin: {
        '96': '24rem',
        '128': '32rem'
      }
    }
  },
  variants: {},
  plugins: []
};
