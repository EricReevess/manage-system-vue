<template>
  <el-col>
    <el-row class="title">
      <h2 v-if="!isCollapseAside">Dashboard</h2>
      <i v-else :class="`el-icon-s-promotion`"/>
    </el-row>
    <el-menu
      default-active="1"
      background-color="#343843"
      text-color="#8395a7"
      active-text-color="#e7604a"
      :collapse="isCollapseAside"
      collapse-transition
      router
      class="el-menu-vertical-demo">
      <el-menu-item
        v-for="item in asideMainMenu"
        @click="handleMenuClick(item)"
        :index="item.path"
        :key="item.path">
        <i :class="`el-icon-${ item.icon }`"/>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu
        v-for="item in asideSubMenu"
        :key="item.path"
        index="">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"/>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.path">
          <el-menu-item
            @click="handleMenuClick(subItem)"
            :index="subItem.path">
            {{subItem.label}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'CommonAside',
  computed: {
    ...mapState({
      isCollapseAside: state => state.headerNav.isCollapseAside
    }),
    // 不将v-if 和 v-for 同时使用
    asideSubMenu () {
      return this.asideMenu.filter(item => item.children)
    },
    asideMainMenu () {
      return this.asideMenu.filter(item => !item.children)
    }
  },
  data () {
    return {
      asideMenu: [
        {
          path: '/home',
          label: '首页',
          name: 'home',
          icon: 's-home'
        },
        {
          path: '/project-manage',
          label: '项目管理',
          name: 'projectManage',
          icon: 's-grid'
        },
        {
          path: '/user-manage',
          label: '用户管理',
          name: 'userManage',
          icon: 'user-solid'
        },
        {
          label: '其他',
          icon: 's-data',
          children: [
            {
              path: '/other-page1',
              name: 'otherPage1',
              label: '其他页面1'
            },
            {
              path: '/other-page2',
              name: 'otherPage2',
              label: '其他页面2'
            }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      selectMenu: 'selectMenu'
    }),
    handleMenuClick (menuItem) {
      this.selectMenu(menuItem)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-col {
    height: 100vh;
    overflow: hidden;
    background-color: #343843;
  }

  .el-menu {
    border: none;
    font-weight: bolder;
    user-select: none;

    span {
      font-size: 1rem;
    }

  }

  /*切换面板过渡时需要*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;

  }

  .title {
    height: 60px;
    display: flex;
    color: #dfe4ea;
    font-size: 1.2em;
    align-items: center;
    justify-content: center;
    background-color: #e7604a;

    h2, i {
      position: absolute;
      letter-spacing: 2px;
      white-space: nowrap;
    }
  }
</style>
