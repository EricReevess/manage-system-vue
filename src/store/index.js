import Vue from 'vue'
import Vuex from 'vuex'
import headerNav from './modules/header-nav'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    headerNav,
    user
  }
})
