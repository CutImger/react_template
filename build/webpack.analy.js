const prodConfig = require("./webpack.prod.js");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 打包分析
module.exports = smp.wrap(
  merge(prodConfig, { plugins: [new BundleAnalyzerPlugin()] })
);
