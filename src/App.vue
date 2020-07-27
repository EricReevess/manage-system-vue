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

  @media screen and (max-width: 1280px) {
    #app {
      width: 1280px;
      height: 800px;
    }
  }
</style>
