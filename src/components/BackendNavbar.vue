<template lang="pug">
aside.slideBar(ref="slideBar")
  router-link.logo(to="/")
  .menuContent
    ul.menu
      li
        router-link(to="/admin/products" @click="closeSlideBar") 產品管理
          span Products
      li
        router-link(to="/admin/orders" @click="closeSlideBar") 訂單管理
          span Orders
      li
        router-link(to="/admin/coupons" @click="closeSlideBar") 優惠券管理
          span Coupons
    .logout
      .logoutContent(@click="logout") 登出
        span Logout
  .closeBtn(@click="closeSlideBar")
    i.fa-solid.fa-xmark
</template>

<script>
import Swal from 'sweetalert2'
export default {
  methods: {
    closeSlideBar () {
      this.$refs.slideBar.classList.remove('active')
    },
    open () {
      this.$refs.slideBar.classList.add('active')
    },
    logout () {
      this.axios.post(`${process.env.VUE_APP_API}/logout`)
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 200
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          document.cookie = 'token=;expired=;'
          this.$router.push('/login')
        })
        .catch(error => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 200
          })
          Toast.fire({
            icon: 'error',
            title: error.response.data.message
          })
        })
    }
  }
}
</script>
