// babel配置
const isDEV = process.env.NODE_ENV === "development";
module.exports = {
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    isDEV && require.resolve("react-refresh/babel"), //开发环境启动热更新
  ].filter(Boolean), //兼容class组件
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 配置使用core-js使用的版本
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
