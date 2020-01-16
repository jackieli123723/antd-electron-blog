const fs = require('fs');
const co = require('co');
const path = require('path');
const oss = require('ali-oss');
let cdnAssetsPublicPath ='';
let ossProject = 'next-blog';
if(process.env.REACT_APP_NODE_CDN_ENV ==='qa'){
  cdnAssetsPublicPath=`${ossProject}/qa`;
}else if(process.env.REACT_APP_NODE_CDN_ENV ==='prod'){
  cdnAssetsPublicPath=`${ossProject}/prod`;
}else if(process.env.REACT_APP_NODE_CDN_ENV ==='dev'){
  cdnAssetsPublicPath=`${ossProject}/dev`;
}

console.log("get", cdnAssetsPublicPath)

let startTime = Date.now();

const store = oss({
    region: '**********',
    accessKeyId: '**********',
    accessKeySecret: '**********',
    bucket: '**********'
});
  
(() => {
  const root = path.resolve(__dirname, './build');// 注意react 默认是build 通过config-overrides.js 改写为dist
  const files = [];
  //递归取出所有文件夹下所有文件的路径
  function readDirSync(p) {
    const pa = fs.readdirSync(p);
    pa.forEach((e) => {
      const cur_path = `${p}/${e}`;
      const info = fs.statSync(cur_path);
      if (info.isDirectory()) {
        readDirSync(cur_path);
      } else {
        files.push(cur_path);
      }
    });
  }
  readDirSync(root);

  co(function* () {
    //遍历文件
    for (let index = 0; index < files.length; index += 1) {
      const e = files[index];
      const result = yield store.multipartUpload(cdnAssetsPublicPath + e.replace(root, ''), e, {
        progress: function* (p) {
          console.log('Progress: ' + p);
        }
      });

      //提交文件到oss
      let endTime = Date.now();
      console.log(result);
      console.log('cdn自动打包部署共用时：' + (endTime - startTime) / 1000 + '秒。');
      
    }
  });
})();

