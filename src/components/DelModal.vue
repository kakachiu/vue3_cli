<template lang="pug">
.modal-dialog
  .modal-content.border-0
    .modal-header.bg-danger
      h5#delProductModalLabel.modal-title(v-if="temp.category")
        span.text-light 刪除產品
      h5#delOrderModalLabel.modal-title(v-if="temp.create_at")
        span.text-light 刪除訂單
      h5#delCouponLabel.modal-title(v-if="temp.code")
        span.text-light 刪除優惠券
      h5#delCouponLabel.modal-title(v-if="temp.qty")
        span.text-light 刪除購物車商品
      button.btn-close(type="button" data-bs-dismiss="modal")
    .modal-body(v-if="temp.category") 是否刪除
      strong.text-danger  {{ temp.title }}
      |  商品(刪除後將無法恢復)。
    .modal-body(v-if="temp.create_at") 是否刪除
      strong.text-danger  {{ temp.create_at }}
      |  訂單(刪除後將無法恢復)。
    .modal-body(v-if="temp.code") 是否刪除
      strong.text-danger  {{ temp.title }}
      |  優惠券(刪除後將無法恢復)。
    .modal-body(v-if="temp.qty") 是否刪除
      strong.text-danger  {{ temp.product.title }}
      |  商品(刪除後將無法恢復)。
    .modal-footer
      button.btn.btn-outline-secondary(type="button" data-bs-dismiss="modal") 取消
      button.btn.btn-danger(type="button" v-if="temp.category" @click="delProduct(temp.id)" :disabled="disable === temp.id") 確認刪除
      button.btn.btn-danger(type="button" v-if="temp.create_at" @click="delOrder(temp.id)" :disabled="disable === temp.id") 確認刪除
      button.btn.btn-danger(type="button" v-if="temp.code" @click="delCoupon(temp.id)" :disabled="disable === temp.id") 確認刪除
      button.btn.btn-danger(type="button" v-if="temp.qty" @click="delCart(temp.id)" :disabled="disable === temp.id") 確認刪除
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props: ['temp', 'delModel'],
  data () {
    return {
      disable: ''
    }
  },
  methods: {
    // 後台刪除單一產品
    delProduct (id) {
      this.disable = id
      this.axios
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`)
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 220
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.disable = ''
          this.delModel.hide()
          this.$emit('getProducts')
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
          this.disable = ''
        })
    },
    // 後台刪除單一訂單
    delOrder (id) {
      this.disable = id
      this.axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`)
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 220
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.disable = ''
          this.delModel.hide()
          this.$emit('getOrders')
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
          this.disable = ''
        })
    },
    // 後台刪除單一優惠券
    delCoupon (id) {
      this.disable = id
      this.axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`)
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 240
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.disable = ''
          this.delModel.hide()
          this.$emit('getCoupons')
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
          this.disable = ''
        })
    },
    // 前台刪除單一購物車
    delCart (id) {
      this.disable = id
      this.axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 240
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.disable = ''
          this.delModel.hide()
          this.$emit('getCarts')
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
          this.disable = ''
        })
    }
  }
}
</script>
