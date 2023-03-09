const isDEV = process.env.NODE_ENV === 'development'
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  // 转换装饰器语法，开发环境下启动热更新
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    isDEV && require.resolve('react-refresh/babel')
  ].filter(Boolean)
}
