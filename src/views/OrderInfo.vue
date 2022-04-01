<template lang="pug">
main.mainContent.orderInfoMain
  loading(:active="isLoading")
    .loadingOuter
      .load
        div
        div
        div
        div
        div
  ul.breadcrumb
    li
      router-link(to="/cart") CART \ 購物車
  section.cartContent
    ul.progressContent
      li
        .number 01
        .text
          .en Check Order
          .cn 填寫資料
      li.active
        .number 02
        .text
          .en Check OrderInfo
          .cn 訂單確認
      li
        .number 03
        .text
          .en Order Complete
          .cn 完成訂單
    .cartList
      .list
        .title 購買商品
        .infoTableOuter
          table.table.table-hover.listTable
            tbody
              tr(v-for="item in order.products" :key="item.id")
                td
                  img.img(:src="item.product.imageUrl" :alt="item.product.title")
                td
                  .name {{ item.product.title }}
                  .number 數量：
                    span {{ item.qty }}
                td {{ convertToAmount(item.total) }}
        .priceOuter
          .totalPrice.finalTotal 折扣後總金額
            span {{ convertToAmount(order.total) }}

      .formOuter
        .title 訂單資訊
        .orderInfo
          table.table.table-hover
            tbody
              tr
                th.orderNumText 訂單編號
                td.orderNumOuter
                  p.orderNum(ref="orderNum") {{ order.id }}
                  button.btn.btn-transparent.copy(type='button' data-bs-toggle="tooltip" data-bs-placement="top" title="<em class='tool'>複製</em>" ref="tooltips" @click="copy")
                    i.fa-solid.fa-copy
              tr
                th 訂購時間
                td {{ date(order.create_at) }}
              tr
                th 姓名
                td {{ order.user.name }}
              tr
                th 聯絡信箱
                td {{ order.user.email }}
              tr
                th 聯絡電話
                td {{ order.user.tel }}
              tr
                th 收件地址
                td {{ order.user.address }}
              tr
                th 備註
                td {{ order.message }}
        input.payBtn(type="button" value="確認付款" @click="pay")
</template>

<script>
import Swal from 'sweetalert2'
import Tooltips from 'bootstrap/js/dist/tooltip'

export default {
  data () {
    return {
      order: {
        user: {},
        total: 0
      },
      isLoading: false,
      tooltips: ''
    }
  },
  methods: {
    // 複製
    copy () {
      const range = document.createRange()
      const orderNum = this.$refs.orderNum
      range.selectNode(orderNum)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      selection.removeAllRanges()
      const tool = document.querySelector('.tool')
      tool.innerHTML = '<em>已複製</em>'
    },
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
    // 付款
    pay () {
      const orderId = this.$route.params.id
      this.axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${orderId}`)
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
          setTimeout(() => {
            // 使用 replace(不包含歷史紀錄)，避免使用者回上一頁的錯誤
            this.$router.replace('/order-complete')
          }, 1500)
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
          this.isLoading = false
        })
    },
    // 取得單一訂單
    getOrders () {
      this.isLoading = true
      const orderId = this.$route.params.id
      this.axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${orderId}`)
        .then(res => {
          this.order = res.data.order
          this.isLoading = false
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
          this.isLoading = false
        })
    }
  },
  created () {
    this.getOrders()
  },
  mounted () {
    this.tooltips = new Tooltips(this.$refs.tooltips, {
      html: true
    })
  }
}
</script>
