module.exports = {
  devServer: {
    port: 4444,
    open: true
  },
  // 配置css预处理器
  css: {
    loaderOptions: {
      sass: {
        // 指定sass全局变量所在文件
        prependData: `
          @import "@/assets/scss/_variables.scss";
        `
      }
    }
  },
  lintOnSave: false
}
