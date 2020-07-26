<template>
  <div id="app">
    <main-page/>
  </div>
</template>

<script>
import MainPage from './views/MainPage'
export default {
  components: { MainPage }
}
</script>

<style lang="scss">
  #app {
    height: 100vh;
    font-family: "PingFang SC", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @media screen and (max-width: 1280px) {
    #app {
      width: 1280px;
      height:800px ;
    }
  }
</style>
