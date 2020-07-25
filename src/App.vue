<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
  #app {
    height: 100vh;
    font-family: "PingFang SC", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @media screen and (max-width: 1366px) {
    #app {
      width: 1366px;
    }
  }
</style>
