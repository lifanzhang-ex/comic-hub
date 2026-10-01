import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  timeout: 30000,
})

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, message } = resolveError(error)
    if (status !== 401) {
      ElMessage.error(message)
    }
    return Promise.reject(error)
  },
)

function resolveError(error) {
  if (error.response) {
    const statusMap = {
      400: '请求参数有误',
      401: '未授权，请先登录',
      403: '服务器拒绝访问',
      404: '请求的资源不存在',
      500: '服务器内部错误',
      502: '服务器无响应',
    }
    return {
      status: error.response.status,
      message: statusMap[error.response.status] || `请求失败 (${error.response.status})`,
    }
  }
  if (error.request) {
    return { status: 0, message: '网络异常，请检查网络连接' }
  }
  return { status: -1, message: error.message || '未知错误' }
}

export default request