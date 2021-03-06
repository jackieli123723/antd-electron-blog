// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
//   };

//way1 react-app-rewired build cdn 方式 react-app-rewired antd 关闭sourceMap失败 antd 还是看得到  less 源码？
/* config-overrides.js */
// const path = require("path");
// const paths = require("react-scripts/config/paths");
// let cdnPublicPath = "";
// let ossProject = "//static.lilidong.cn/next-blog";
// if (process.env.REACT_APP_ENV == "qa") {
//   cdnPublicPath = `${ossProject}/qa`;
// } else if (process.env.REACT_APP_ENV == "prod") {
//   cdnPublicPath = `${ossProject}/prod`;
// } else if (process.env.REACT_APP_ENV == "dev") {
//   cdnPublicPath = `${ossProject}/dev`;
// }

// console.log("get", cdnPublicPath);
// process.env.GENERATE_SOURCEMAP = "false"; //关闭sourceMap antd 和业务都能关闭
// module.exports = function override(config, env) {
//   // 非打包环境下
//   if (config.mode !== "production") {
//     return config;
//   }

//   //关闭sourceMap
//   config.devtool =
//     config.mode === "development" ? "cheap-module-source-map" : false;
//   // 修改path目录 默认为build
//   paths.appBuild = path.join(path.dirname(paths.appBuild), "build"); //path.join(path.dirname(paths.appBuild), "dist");这里要打包客户端用的dist 要换个名字
//   config.output.path = path.join(path.dirname(config.output.path), "build");
//   config.output.publicPath = cdnPublicPath;
//   return config;
// };

//自己的方式way2 ---
// yarn start 运行这个有less 效果  ok
// yarn start-dev less 失败 样式没编译
const path = require("path");
const paths = require("react-scripts/config/paths");
const { override, fixBabelImports, addLessLoader } = require("customize-cra");
process.env.GENERATE_SOURCEMAP = "false"; //关闭sourceMap antd 和业务都能关闭
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
  })
);
