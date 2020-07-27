import Mock from 'mockjs'
import homeDataApi from './homeDataApi'
import userDataApi from './userDataApi'
import permissionApi from './permission'
// 设置延时 1-3秒
Mock.setup({
  timeout: '500-1000'
})
// 使用正则匹配带有 /home/getHomeData 的请求
Mock.mock(/\/home\/getHomeData/, homeDataApi.getHomeData)

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userDataApi.getUserList)
Mock.mock(/\/user\/del/, 'post', userDataApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userDataApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userDataApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userDataApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeDataApi.getHomeData)
// 权限相关
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)
