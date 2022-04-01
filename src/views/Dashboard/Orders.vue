<template lang="pug">
section.order.mainContent
  loading(:active="isLoading")
    .loadingOuter
      .load
        div
        div
        div
        div
        div
  .header
    h2.title 訂單管理
      span Orders
    button.btn.addBtn(type="button" @click="judgeModal('delAll')") 刪除全部訂單
  .content
    .responsive
      table.table.table-hover
        thead.table-dark
          tr
            th(width="120") 購買時間
            th Email
            th 購買品項
            th 應付金額
            th 付款狀態
            th 操作
        tbody
          tr(v-for="item in orders" :key="item.id")
            td {{ date(item.create_at)}}
            td {{ item.user.email }}
            td
              ul.productList
                li(v-for="product in item.products" :key="product.id")
                  | {{ product.product.title }} {{product.qty}} {{ product.product.unit }}
            td {{ convertToAmount(item.total) }} 元
            td
              p.text-success(v-if="item.is_paid") 已付款
              p.text-danger(v-else) 未付款
            td
              .btn-group
                button.btn.btn-sm.btn-outline-primary(type="button" @click="judgeModal('detail',item)") 查看
                button.btn.btn-sm.btn-outline-danger(type="button" @click="judgeModal('delete',item)") 刪除

    p.mb-2.length 目前有
      span.text-success  {{ orders.length }}
      | 筆訂單

    //- 分頁
    Pagination(:pagination='pagination' @change-page='getOrders')

    //- 編輯 Modal
    #orderModal.modal.fade(ref="orderModal" tabindex="-1")
      OrderModal(:temp="temp" @get-orders="getOrders" :order-modal="orderModal")

    //- 刪除 Modal
    #delOrderModal.modal.fade(ref="delOrderModal" tabindex="-1")
      DelModal(:temp="temp" @get-orders="getOrders" :del-model="delModel")

    //- 刪除全部 Modal
    #orderAllDel.modal.fade(ref="orderAllDel" tabindex="-1")
      DelAllModal(:del-text="delText" @del-all-order="delAllOrder")
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import Swal from 'sweetalert2'
import Pagination from '@/components/Pagination.vue'
import OrderModal from '@/components/OrderModal.vue'
import DelModal from '@/components/DelModal.vue'
import DelAllModal from '@/components/DelAllModal.vue'

export default {
  data () {
    return {
      orders: [],
      pagination: {},
      temp: {},
      orderModal: '',
      delModel: '',
      orderAllDel: '',
      delText: '',
      isLoading: false
    }
  },
  components: {
    Pagination,
    OrderModal,
    DelModal,
    DelAllModal
  },
  methods: {
    // 取得全部訂單
    getOrders (page = 1) {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then(res => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
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
    // Modal 判斷
    judgeModal (isNew, item) {
      switch (isNew) {
        case 'detail':
          this.temp = { ...item }
          this.orderModal.show()
          break
        case 'delete':
          this.temp = { ...item }
          this.delModel.show()
          break
        case 'delAll':
          this.delText = isNew
          this.orderAllDel.show()
          break
        default:
          break
      }
    },
    // 刪除全部訂單
    delAllOrder () {
      this.axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`)
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
          this.orderAllDel.hide()
          this.getOrders()
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
  created () {
    this.getOrders()
  },
  mounted () {
    this.orderModal = new Modal(this.$refs.orderModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.delModel = new Modal(this.$refs.delOrderModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.orderAllDel = new Modal(this.$refs.orderAllDel, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
