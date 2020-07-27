import Cookie from 'js-cookie'

export default {
  state: {
    isCollapseAside: true, // 折叠侧边菜单标志
    currentPosition: { // 保存当前位置
      path: '/',
      label: '首页',
      icon: 's-home'
    },
    menu: [],
    tagsList: [] // 记录访问历史记录的标签数组
  },
  mutations: {
    setMenu (state, val) { // 设置vuex 中路由的数据
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    addMenu (state, router) { // 通过路由数据动态生成路由
      if (!JSON.parse(Cookie.get('menu'))) {
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const currentMenu = [
        {
          path: '/',
          component: () => import('../../views/MainPage'),
          children: []
        }
      ]
      console.log(currentMenu)
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../../views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`../../views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    },
    clearMenu (state) {
      state.menu = []
      Cookie.remove('menu')
    },
    selectMenu (state, val) {
      state.currentPosition = val
      if (val.label !== '首页') {
        if (state.tagsList.findIndex(item => item.label === val.label) === -1) {
          state.tagsList.push(val)
        }
      } else {
      }
    },
    closeTag (state, val) {
      const index = state.tagsList.findIndex(item => item.name === val)
      state.tagsList.splice(index, 1)
    },
    collapseAside (state) {
      state.isCollapseAside = !state.isCollapseAside
    }
  },
  actions: {}
}
