import axios from 'axios'
// 创建axios实例
const service = axios.create({
  // 请求超时时间
  timeout: 3000
})

// 请求拦截器,promise对象
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
  }
)
// 响应拦截器
service.interceptors.response.use(
  // 拦截响应数据,根据不同状态码响应不同操作
  response => {
    const res = {}
    res.status = response.status // 接收状态码,可进行判断
    res.data = response.data
    return res
  },
  err => {
    console.log(err)
  })
export default service
