module.exports = {
  plugins: [
    require('autoprefixer'),
    require("postcss-plugin-px2rem")({
      rootValue: 19.2, //换算基数，1rem相当于10px,值为37.5时,1rem为20px,淘宝的flex默认为1rem为10px
      unitPrecision: 5, //允许REM单位增长到的十进制数字。
      propBlackList: [], //黑名单
      exclude: /(node_module)/,
      mediaQuery: true, //（布尔值）允许在媒体查询中转换px。
      minPixelValue: 1, //设置要替换的最小像素值(3px会被转rem)。 默认 0
    }),
  ],
};