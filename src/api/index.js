import fetch from '../utils/fetch';

//注册用户
export function PostUserSignup(params) {
  const data=params;
  return fetch({
    url: '/user/signup',  
    method: 'post',
    data
  });
}

//用户登录
export function PostLogin(params) {
  const data=params;
  return fetch({
    url: '/user/login',  
    method: 'post',
    data
  });
}

//文章add

export function PostArticleAdd(params) {
  const data=params;
  return fetch({
    url: '/article/add',  
    method: 'post',
    data
  });
}

//文章全部

export function GetArticleList(params) {
  const data=params;
  return fetch({
    url: '/article/list',  
    method: 'post',
    data
  });
}

//文章删除 delete 注意是method delete
export function PostArticleDelete(params) {
  const data=params;
  return fetch({
    url: '/article/delete',  
    method: 'delete',
    data
  });
}


//文章单个获取
export function GetArticleById(params) {
  const data=params;
  return fetch({
    url: '/article/detail',  
    method: 'post',
    data
  });
}

//文章单个更新
export function PostArticleUpdate(params) {
  const data=params;
  return fetch({
    url: '/article/update',  
    method: 'post',
    data
  });
}

//获取全部评论
export function GetCommentList(params) {
  const data=params;
  return fetch({
    url: '/comment/list',  
    method: 'post',
    data
  });
}

//文章删除 delete 注意是method delete
export function PostCommentDelete(params) {
  const data=params;
  return fetch({
    url: '/comment/delete',  
    method: 'delete',
    data
  });
}



export function deleteAccount(params) {
  const data=params;
  return fetch({
    url: '/account/delete',  //‘api’ proxytable 添加
    method: 'post',
    data
  });
}
export function deleteApp(params) {
  const data=params;
  return fetch({
    url: '/app/shift-delete',
    method: 'post',
    data
  });
}
export function getUserList(params) {
  return fetch({
    url: '/accounts',
    method: 'get',
    params
  });
}
export function getUserInfo(params) {
  return fetch({
    url: '/account/profile',
    method: 'get',
    params
  });
}
export function getApp(params) {
  return fetch({
    url: '/apps',
    method: 'get',
    params
  });
}
export function getThemeList(params) {
  return fetch({
    url: '/themes',
    method: 'get',
    params
  });
}
export function updateApp(params) {
  const data=params;
  return fetch({
    url: '/app/update',
    method: 'post',
    data
  });
}
export function createApp(params) {
  const data=params;
  return fetch({
    url: '/app/create',
    method: 'post',
    data
  });
}
export function createAccount(params) {
  const data=params;
  return fetch({
    url: '/account/create',
    method: 'post',
    data
  });
}
export function createTheme(params) {
  const data=params;
  return fetch({
    url: '/theme/create',
    method: 'post',
    data
  });
}

export function createMenu(params) {
  const data=params;
  return fetch({
    url: '/theme/menu/create',
    method: 'post',
    data
  });
}
