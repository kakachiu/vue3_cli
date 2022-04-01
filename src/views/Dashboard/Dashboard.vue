<template lang="pug">
loading(:active="isLoading")
  .loadingOuter
    .load
      div
      div
      div
      div
      div
.dashBoard
  BackendNavbar(ref="slideBar")
  .phoneHead
    i.fa-solid.fa-bars.bar(@click="openSlideBar")
  router-view(v-if="checkSuccess")
</template>

<script>
import Swal from 'sweetalert2'
import BackendNavbar from '@/components/BackendNavbar.vue'
export default {
  data () {
    return {
      checkSuccess: false,
      isLoading: false
    }
  },
  components: {
    BackendNavbar
  },
  methods: {
    // 開啟側邊攔
    openSlideBar () {
      this.$refs.slideBar.open()
    },
    // 驗證身分
    checkAuth () {
      this.isLoading = true
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.axios.defaults.headers.common.Authorization = token

      this.axios.post(`${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.checkSuccess = true
          this.isLoading = false
        })
        .catch(error => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 290
          })
          Toast.fire({
            icon: 'error',
            title: error.response.data.message
          })
          this.isLoading = false
          this.$router.push('/login')
        })
    }
  },
  created () {
    this.checkAuth()
  }
}
</script>
