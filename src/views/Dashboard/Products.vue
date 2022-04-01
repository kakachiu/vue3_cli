<template lang="pug">
section.products.mainContent
  loading(:active="isLoading")
    .loadingOuter
      .load
        div
        div
        div
        div
        div
  .header
    h2.title 產品管理
      span Products
    button.btn.addBtn(type="button" @click="judgeModal('new')") 新增產品
  .content
    .responsive
      table.table.table-hover
        thead.table-dark
          tr
            th 產品名稱
            th 原價
            th 售價
            th 啟用狀態
            th(width="140") 操作
        tbody
          tr(v-for="item in products" :key="item.id")
            td {{ item.title }}
            td {{ convertToAmount(item.origin_price) }}
            td {{ convertToAmount(item.price) }}
            td
              span.text-success(v-if="item.is_enabled") 啟用
              span.text-danger(v-else) 未啟用
            td
              .btn-group.btn-group-sm
                button.btn.btn-outline-primary(type="button" @click="judgeModal('edit',item)") 編輯
                button.btn.btn-outline-danger(type="button" @click="judgeModal('delete',item)") 刪除
    p.mb-2.length 目前有
      span.text-success  {{ products.length }}
      | 項產品

    //- 分頁
    Pagination(:pagination="pagination" @change-page="getProducts")

    //- 新增&修改 Modal
    #productModal.modal.fade(ref="productModal" tabindex="-1")
      ProductModals(:temp="temp" @get-products="getProducts" :product-modal="productModal")
    //- 刪除 Modal
    #delProductModal.modal.fade(ref="delProductModal" tabindex="-1")
      DelModal(:temp="temp" @get-products="getProducts" :del-model="delModel")
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import Swal from 'sweetalert2'
import Pagination from '@/components/Pagination.vue'
import ProductModals from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  data () {
    return {
      isLoading: false,
      products: [],
      temp: {},
      pagination: {},
      productModal: '', // 使用 ref 取得 dom 元素，先定義資料
      delModel: '' // 使用 ref 取得 dom 元素，先定義資料
    }
  },
  components: {
    Pagination,
    ProductModals,
    DelModal
  },
  methods: {
    // Modal 判斷
    judgeModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.temp = {}
          this.productModal.show()
          break
        case 'edit':
          this.temp = { ...item }
          this.productModal.show()
          break
        case 'delete':
          this.temp = { ...item }
          this.delModel.show()
          break
        default:
          break
      }
    },
    // 取得全部產品
    getProducts (page = 1) {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then(res => {
          this.products = res.data.products
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
    // $+千分位
    convertToAmount (num) {
      const parts = num.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return '$ ' + parts.join('.')
    }
  },
  created () {
    this.getProducts()
  },
  mounted () {
    this.productModal = new Modal(this.$refs.productModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.delModel = new Modal(this.$refs.delProductModal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
