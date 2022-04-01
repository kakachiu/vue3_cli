<template lang="pug">
.modal-dialog
  .modal-content
    .modal-header.bg-info(v-if="!newTemp.id")
      h5#exampleModalLabel.modal-title
        span.text-light 新增優惠卷
      button.btn-close(type="button" data-bs-dismiss="modal")
    .modal-header.bg-warning(v-else)
      h5#exampleModalLabel.modal-title
        span 編輯優惠卷
      button.btn-close(type="button" data-bs-dismiss="modal")
    .modal-body
      .mb-3
        label(for="title") 標題
        input#title.form-control(type="text" v-model="newTemp.title" placeholder="請輸入標題")
      .mb-3
        label(for="coupon_code") 優惠碼
        input#coupon_code.form-control(type="text" v-model="newTemp.code" placeholder="請輸入優惠碼")
      .mb-3
        label(for="due_date") 到期日
        input#due_date.form-control(type="date" v-model="due_date")
      .mb-3
        label(for="price") 折扣百分比
        input#price.form-control(type="number" min="0" max="100" v-model.number="newTemp.percent" placeholder="請輸入折扣百分比")
      .mb-3
        .form-check
          input#is_enabled.form-check-input(type="checkbox" :true-value="1" :false-value="0" v-model="newTemp.is_enabled")
          label.form-check-label(for="is_enabled") 是否啟用
    .modal-footer
      button.btn.btn-secondary(type="button" data-bs-dismiss="modal") 取消
      button.btn.btn-primary(type="button" @click="checkEdit") 確認
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props: ['temp', 'couponModal'],
  data () {
    return {
      newTemp: {},
      due_date: ''
    }
  },
  watch: {
    temp () {
      this.newTemp = this.temp
      // 時間格式化 YYYY-MM-DD
      const dateAndTime = new Date(this.newTemp.due_date * 1000)
        .toISOString().split('T')
      ;[this.due_date] = dateAndTime
    },
    // 監聽日期
    due_date () {
      this.newTemp.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  methods: {
    // 新增與編輯優惠卷
    checkEdit () {
      if (!this.newTemp.id) {
        this.axios
          .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`, { data: this.newTemp })
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
            this.couponModal.hide()
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
          })
      } else {
        this.axios
          .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.temp.id}`, {
            data: this.newTemp
          })
          .then(res => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1400,
              width: 230
            })
            Toast.fire({
              icon: 'success',
              title: res.data.message
            })
            this.couponModal.hide()
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
          })
      }
    }
  }
}
</script>
