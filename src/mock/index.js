import Mock from 'mockjs'
import HomeDataApi from './homeDataApi'
// 设置延时 1-3秒
Mock.setup({
  timeout: '500-1000'
})
// 使用正则匹配带有 /home/getHomeData 的请求
Mock.mock(/\/home\/getHomeData/, HomeDataApi.getHomeData)
