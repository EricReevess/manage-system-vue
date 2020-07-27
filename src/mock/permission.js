/* eslint-disable */
import Mock from 'mockjs'

export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (username === 'admin' || username === 'ljp') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                path: '/project-manage',
                name: 'projectManage',
                label: '项目管理',
                icon: 's-grid',
                url: 'ProjectManage/ProjectManage'
              },
              {
                path: '/user-manage',
                name: 'user',
                label: '用户管理',
                icon: 'user-solid',
                url: 'UserManage/UserManage'
              },
              {
                label: '其他',
                icon: 's-data',
                children: [
                  {
                    path: '/other-page1',
                    name: 'otherPage1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Other/OtherPage1'
                  },
                  {
                    path: '/other-page2',
                    name: 'otherPage2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Other/OtherPage2'
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (username === 'ljp' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                path: '/project-manage',
                name: 'projectManage',
                label: '项目管理',
                icon: 's-grid',
                url: 'projectManage/projectManage'
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
