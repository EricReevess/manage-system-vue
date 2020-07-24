import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入reset样式
// 需要在element-ui之前引入reset样式
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'

// 引入第三方包
import ElementUI from 'element-ui'
import HttpHandler from './api/config'
import './mock'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$httpRequest = HttpHandler // 将axios实例拦截器挂载到Vue上,访问this.$httpRequest

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
