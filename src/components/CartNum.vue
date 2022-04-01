<template lang="pug">
router-link.cart(to="/cart")
  i.fa-solid.fa-cart-shopping
  .num(v-if="cardData.carts.length") {{ cardData.carts.length }}
</template>

<script>
import emitter from '@/libs/emitter.js'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      cardData: {
        carts: []
      }
    }
  },
  methods: {
    getCart () {
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          this.cardData = res.data.data
        })
        .catch(error => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 320
          })
          Toast.fire({
            icon: 'error',
            title: error.response.data.message
          })
        })
    }
  },
  mounted () {
    emitter.on('addCart', () => {
      this.getCart()
    })
    this.getCart()
  }
}
</script>
