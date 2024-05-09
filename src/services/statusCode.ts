export const statusCodeProcess = (status: number) => {
  let messages
  switch (status) {
    case 401:
      messages = 'token失效，请重新登录'
      // 这里可以触发退出的 action
      break
    case 403:
      messages = '没有权限,请获取权限后登录'
      break
    case 404:
      messages = '页面不存在'
      break
    case 500:
      messages = '服务器故障'
      break
    case 502:
      messages = '数据库查询错误'
      break
    case 504:
      messages = '服务内部错误'
      break
    default:
      messages = '网络连接错误'
  }
  return messages
}
