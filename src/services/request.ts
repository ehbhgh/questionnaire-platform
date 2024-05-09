import axios from 'axios'
import { message } from 'antd'
import { statusCodeProcess } from './statusCode'
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
const instance: AxiosInstance = axios.create({
  timeout: 10 * 1000,
})

//请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg, data } = response.data // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      // 将组件用的数据返回
      message.success(msg)
      return data
    } else {
      return Promise.reject(new Error(msg))
    }
  },
  (error: AxiosError) => {
    // HTTP 状态码
    const status = error.response?.status as number
    message.error(statusCodeProcess(status))
    return Promise.reject(error)
  }
)
export default instance
