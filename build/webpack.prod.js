const path = require("path");
const glob = require("glob-all");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

// 生产环境打包
module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    // new BundleAnalyzerPlugin()
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css", // 抽离css的输出目录和名称
    }),
    // 清理无用css -> issues url: https://github.com/FullHuman/purgecss/issues/994
    // new PurgeCSSPlugin({
    //   // 检测src下所有tsx文件中使用的类名和id和标签名称,只打包这些文件中用到的样式
    //   paths: () =>
    //     glob.sync(`${path.join(__dirname, "../src")}/**/*.tsx`, {
    //       nodir: true,
    //     }),
    // }),
    // 开启gzip
    new CompressionPlugin({
      test: /.(js|css)$/,
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
    ],
    splitChunks: {
      // 拆包、抽离公共模块
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: "vendors",
          minChunks: 1,
          chunks: "initial",
          minSize: 0,
          priority: 1,
        },
        commons: {
          name: "commons",
          minChunks: 2,
          chunks: "initial",
          minSize: 0,
        },
      },
    },
  },
});
