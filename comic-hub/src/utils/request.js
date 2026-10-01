import axios from "axios";

// ------------------------------------------------------
// 原生 fetch 封装的 API（未被使用，保留以备后用）
// ------------------------------------------------------
export async function fetchAPI(API_BASE, url, options = {}) {
  // 如果是 FormData，删除 Content-Type 让浏览器自动设置
  const headers = { 'Content-Type': 'application/json' };
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }
  const res = await fetch(API_BASE + url, {
    headers: headers,
    ...options
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return await res.json();
}

// ------------------------------------------------------
// 错误提示处理函数
// ------------------------------------------------------
function errorHandle(status, info) {
  // 如果 info 是对象，转为字符串便于显示
  const msg = typeof info === 'string' ? info : JSON.stringify(info);
  switch (status) {
    case 400:
      console.log("语义有误", msg);
      break;
    case 401:
      console.log("服务器认证失败", msg);
      break;
    case 403:
      console.log("服务器拒绝访问", msg);
      break;
    case 404:
      console.log("地址错误", msg);
      break;
    case 500:
      console.log("服务器遇到意外", msg);
      break;
    case 502:
      console.log("服务器无响应", msg);
      break;
    case 0:   // 网络不通或请求未发出
      console.log("网络请求失败，请检查网络连接", msg);
      break;
    default:
      console.log(info || "未知错误");
      break;
  }
}

// ------------------------------------------------------
// 创建 axios 实例
// ------------------------------------------------------
const instance = axios.create({
  timeout: 30000,
});

// 请求拦截器（目前未做特殊处理，可扩展）
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 必须返回 Promise.reject，否则错误会被吞掉
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 只要状态码是 2xx 就会进入这里，直接返回响应
    return response;
  },
  error => {
    // --------------------------------------------------
    // 修复：安全获取 status 和 info，避免 undefined 报错
    // --------------------------------------------------
    let status = -1;       // 默认未知状态
    let info = '';

    if (error.response) {
      // 服务器有响应，但状态码非 2xx
      status = error.response.status;
      info = error.response.data || error.message;
    } else if (error.request) {
      // 请求已发出，但未收到响应（网络问题）
      status = 0;          // 用 0 表示网络不通
      info = '请求超时或网络异常';
    } else {
      // 其他错误（如请求配置错误）
      status = -1;
      info = error.message || '未知错误';
    }

    // 调用错误提示函数
    errorHandle(status, info);

    // 将错误继续抛出，以便业务代码的 catch 能捕获
    return Promise.reject(error);
  }
);

export default instance;