import axios from 'axios';
import qs from 'qs';
// console.log('NODE_ENV: ',  process.env.NODE_ENV)
// https 生产环境要用相对路径
//const BASE_API = process.env.NODE_ENV === 'development' ? "http://118.24.30.92:8085/api" : "http://118.24.30.92:8085/api";
const BASE_API = process.env.NODE_ENV === 'development' ? "http://localhost:3200/api" : "http://localhost:3200/api";

//express 8080  
//koa 3200 


// 创建axios实例
const service = axios.create({
  baseURL: BASE_API,
  timeout: 20000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    data = qs.stringify(data)
    // data = JSON.stringify(data)
    return data;
  }]
});
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//localStorage封装
function localFetch(key) {
  return JSON.parse(localStorage.getItem(key)||'[]')
}
function localDelete(key) {
   return localStorage.removeItem(key)
}

// 添加请求拦截器token
service.interceptors.request.use(config => { 
  config.emulateJSON = true;
  // if (localFetch('token')) {
  //   if (!config.params) {
  //     config.params = {
  //       token: localFetch('token')
  //     }
  //   } else {
  //     config.params.token = localFetch('token')
  //   }
  // } else if (config.url.indexOf('/User/Login') == -1 && config.url.indexOf('/User/IsLoginAuth') == -1) {
  //   // router.replace('/login')
  //   localDelete('token')
  // }
  // console.log(config.url,config.data)
  return config;
}, error => {
  //NProgress.done();
  Promise.reject(error);
})




// request拦截器
// service.interceptors.request.use(config => {
//   config.emulateJSON = true;
//   return config;
// }, error => {
//   Promise.reject(error);
// })

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    const code = response.data.code;
    return res
  },
  error => {
    console.log('err');
    return Promise.reject(error);
  }
)



export default service;
