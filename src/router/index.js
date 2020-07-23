import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: () => import('../views/MainPage'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home/Home')
      },
      {
        path: '/project-manage',
        name: 'projectManage',
        component: () => import('../views/ProjectManage/ProjectManage')
      },
      {
        path: '/user-manage',
        name: 'userManage',
        component: () => import('../views/UserManage/UserManage')
      },
      {
        path: '/other-page1',
        name: 'otherPage1',
        component: () => import('../views/Other/OtherPage1')
      },
      {
        path: '/other-page2',
        name: 'otherPage2',
        component: () => import('../views/Other/OtherPage2')
      }
    ]
  }

]
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
