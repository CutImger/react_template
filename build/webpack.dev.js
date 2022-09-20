const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 开启源码调试模式
  devServer: {
    port: 8888,
    compress: false,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "../assets"), //静态资源assets文件夹
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ]
})