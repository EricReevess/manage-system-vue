export default {
  state: {
    isCollapseAside: false, // 折叠侧边菜单标志
    currentPosition: { // 保存当前位置
      path: '/',
      label: '首页',
      icon: 's-home'
    },
    menu: [],
    tagsList: [] // 记录访问历史记录的标签数组
  },
  mutations: {
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
