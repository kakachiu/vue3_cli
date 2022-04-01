<template lang="pug">
.modal-dialog.modal-xl.orderModal
  .modal-content.border-0
    .modal-header.bg-warning.text-white
      h5#exampleModalLabel.modal-title
        span 訂單細節
      button.btn-close(type="button" data-bs-dismiss="modal")
    .modal-body
      .row
        .col-lg-4
          h3 用戶資料
          table.table
            tbody(v-if="newTemp.user")
              tr
                th(style="width: 100px") 姓名
                td {{ newTemp.user.name }}
              tr
                th Email
                td {{ newTemp.user.email }}
              tr
                th 電話
                td {{ newTemp.user.tel }}
              tr
                th 地址
                td {{ newTemp.user.address }}
        .col-lg-8
          h3 訂單細節
          table.table
            tbody
              tr
                th(style="width: 100px") 訂單編號
                td {{ newTemp.id }}
              tr
                th 下單時間
                td {{ date(newTemp.create_at) }}
              tr
                th 付款時間
                td
                  span(v-if="newTemp.paid_date")
                    | {{ date(newTemp.paid_date) }}
                  span(v-else) 時間不正確
              tr
                th 付款狀態
                td
                  strong.text-success(v-if="newTemp.is_paid") 已付款
                  span.text-muted(v-else) 尚未付款
              tr
                th 總金額
                td {{ convertToAmount(newTemp.total) }}
          h3 選購商品
          table.table
            thead
              tr
            tbody
              tr(v-for="item in newTemp.products" :key="item.id")
                th {{ item.product.title }}
                td {{ item.qty }} / {{ item.product.unit }}
                td.text-end {{ convertToAmount(item.final_total) }}
          .d-flex.justify-content-end
            .form-check
              input#flexCheckDefault.form-check-input(type="checkbox" value="" v-model="newTemp.is_paid")
              label.form-check-label(for="flexCheckDefault")
                span(v-if="newTemp.is_paid") 已付款
                span(v-else) 未付款
    .modal-footer
      button.btn.btn-outline-secondary(type="button" data-bs-dismiss="modal")
        | 取消
      button.btn.btn-primary(type="button" @click="edidPay(newTemp.id)")
        | 修改付款狀態
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      newTemp: {
        total: ''
      }
    }
  },
  props: ['temp', 'orderModal'],
  watch: {
    temp () {
      this.newTemp = JSON.parse(JSON.stringify(this.temp))
    }
  },
  methods: {
    // 日期
    date (date) {
      const newDate = new Date(date * 1000)
      const dateTime = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`
      return dateTime
    },
    // $+千分位
    convertToAmount (num) {
      const parts = num.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return '$ ' + parts.join('.')
    },
    // 編輯訂單
    edidPay (id) {
      this.axios.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`, { data: this.newTemp })
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 250
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.orderModal.hide()
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
        })
    }
  }
}
</script>
