// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
//   };


//way1 react-app-rewired build cdn 方式
/* config-overrides.js */
const path = require('path')
const paths = require('react-scripts/config/paths')

let cdnPublicPath ='';
let ossProject = '//static.lilidong.cn/next-blog';
if(process.env.REACT_APP_ENV == 'qa'){
  cdnPublicPath=`${ossProject}/qa`;
}else if(process.env.REACT_APP_ENV == 'prod'){
  cdnPublicPath=`${ossProject}/prod`;
}else if(process.env.REACT_APP_ENV == 'dev'){
  cdnPublicPath=`${ossProject}/dev`;
}

console.log("get", cdnPublicPath)

module.exports = function override (config, env) {
  // 非打包环境下
  if (config.mode !== 'production') { return config }
  // 修改path目录 默认为build
  paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
  config.output.path = path.join(path.dirname(config.output.path), 'dist')
  config.output.publicPath = cdnPublicPath
  return config
}


//自己的方式way2 
// const path = require('path')
// const paths = require('react-scripts/config/paths')
// const { override, fixBabelImports, addLessLoader } = require('customize-cra');
//  module.exports = override(
//     fixBabelImports('import', {
//       libraryName: 'antd',
//       libraryDirectory: 'es',
//       style: true,
//   }),
//   addLessLoader({
//     javascriptEnabled: true,
//     modifyVars: { '@primary-color': '#1DA57A' },
//   }),
//  );