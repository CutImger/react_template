const { merge } = require('webpack-merge')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const globAll = require('glob-all')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

// 打包配置
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: source => {
            return !source.includes('index.html')
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new PurgeCSSPlugin({
      paths: globAll.sync([
        `${path.join(__dirname, '../src')}/**/*.tsx`,
        path.join(__dirname, '../public/index.html')
      ]),
      safelist: {
        standard: [/^ant-/] // 过滤以ant-开头的类名，避免误删了antd的样式
      }
    }),
    new CompressionPlugin({
      test: /.(js|css)$/,
      filename: '[path][base].[contenthash:8].gz', // 文件命名
      algorithm: 'gzip',
      test: /.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ['console.log', 'debugger'] // 删除调试代码
          }
        }
      })
    ],
    splitChunks: {
      // 分割代码
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          minChunks: 1,
          chunks: 'initial',
          minSize: 0,
          priority: 1
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial',
          minSize: 0
        }
      }
    }
  }
})
