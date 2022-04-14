
<template lang="pug">
section.login
  .container.loginContent(ref="loginContent")
    .wellCome(ref="wellCome")
      h2.title WELCOME
      p.text 享受美食 | 享受當下 | 享受生活
      .img
        img(src="img/logo.jpg" alt="登入")
      .loginBtn(ref="loginBtn" @click="login") 登入
        span LOGIN
      router-link(to="/")
        p.goHome(ref="goHome") 回首頁

    Form.loginForm(v-slot="{ errors }" @submit="checkLogin" ref="loginForm")
      .email
        label(for="email") 帳號
        Field#email(type="email" name="E-MAIL" :class="{ 'is-invalid': errors['E-MAIL'] }" placeholder="請輸入 E-MAIL" rules="email|required" v-model="username")
        error-message.invalid-feedback(name="E-MAIL")
      .password
        label(for="password") 密碼
        Field#password(:type="type" name="密碼" :class="{ 'is-invalid': errors['密碼'] }" placeholder="請輸入密碼" rules="required" ref="passwordType" v-model="password")
        .icon
          i.fa-solid.fa-eye-slash.close(ref="close" @click="close")
          i.fa-solid.fa-eye.open(ref="open" @click="open")
        error-message.invalid-feedback(name="密碼")
      .links
        router-link.forget(to="/login") 忘記密碼？
        router-link.toHome(to="/") 回首頁
      button.checkLogin(type="submit") 登入
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      username: '',
      password: '',
      type: 'password'
    }
  },
  methods: {
    // 登入
    checkLogin () {
      const username = this.username
      const password = this.password
      const info = {
        username,
        password
      }
      this.axios.post(`${process.env.VUE_APP_API}/admin/signin`, info)
        .then(res => {
          const { expired, token } = res.data
          document.cookie = `token=${token}; expires=${new Date(expired)}`

          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 200
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          setTimeout(() => {
            this.$router.push('/admin/products')
          }, 1300)
        })
        .catch(error => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 200
          })
          Toast.fire({
            icon: 'error',
            title: error.response.data.message
          })
          this.$refs.loginForm.resetForm()
        })
    },
    // 使用 JS 做動畫
    login () {
      this.$refs.loginContent.classList.add('block')
      this.$refs.goHome.classList.add('active')
      this.$refs.wellCome.classList.add('active')
      setTimeout(() =>
        this.$refs.loginContent.classList.contains('block') && this.$refs.loginContent.classList.add('opacity')
      , 150)
    },
    // 更改 input type
    close () {
      this.type = 'text'
      this.$refs.open.classList.add('active')
      this.$refs.close.classList.add('active')
    },
    // 更改 input type
    open () {
      this.type = 'password'
      this.$refs.passwordType.type = 'password'
      this.$refs.close.classList.remove('active')
      this.$refs.open.classList.remove('active')
    }
  }
}
</script>
