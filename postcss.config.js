/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-plugin-px2rem')({
      rootValue: 19.2,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude: /(node_module)/,
      selectorBlackList: [],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 3
    })
  ]
}
