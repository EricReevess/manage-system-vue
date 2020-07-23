<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside/>
    </el-aside>
    <el-container>
      <el-header
        height="80px">
        <common-header/>
      </el-header>
      <common-tags/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader'
import CommonTags from '../components/CommonTags'
export default {
  name: 'MainPage',
  components: { CommonTags, CommonHeader, CommonAside }
}
</script>

<style lang="scss" scoped>
  .el-aside {
    width: 200px;
  }
  .el-header {
    background-color: #343843;
  }
</style>
