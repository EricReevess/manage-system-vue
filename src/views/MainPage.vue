<template>
  <el-container>
    <el-aside width="auto">
      <common-aside/>
    </el-aside>
    <el-container>
      <el-header
        height="60px">
        <common-header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader'

export default {
  name: 'MainPage',
  components: { CommonHeader, CommonAside }
}
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100vh;
  }

  .el-aside {
    width: 200px;
    background-color: #343843;
    overflow: hidden;
  }

  .el-header {
    background-color: #343843;
  }

  .el-main {
    height: 80vh;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #ecf0f1;
  }
</style>
