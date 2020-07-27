<template>
  <div class="login">
    <el-form class="login-warp" :model="loginFormData">
      <h1>登入</h1>
      <el-form-item label="用户名">
        <el-input v-model="loginFormData.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginFormData.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginHandler">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      loginFormData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations({
      setMenu: 'setMenu',
      clearMenu: 'clearMenu',
      addMenu: 'addMenu',
      setToken: 'setToken'
    }),
    loginHandler () {
      this.$httpRequest.post('/permission/getMenu', this.loginFormData).then(
        res => {
          const { data } = res.data
          if (res.data.code === 20000) {
            this.clearMenu()
            this.setMenu(data.menu)
            this.setToken(data.token)
            this.addMenu(this.$router)
            this.$router.push({ name: 'home' })
          } else {
            this.$message.error(data.message)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-warp {
    width: 400px;
    height: 400px;
    border: 1px solid #c0d2ec;
    border-radius: 20px;
    padding: 40px 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 2.8rem;
    }
  }
</style>
