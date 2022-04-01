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
    h2.title 優惠券管理
      span Products
    button.btn.addBtn(type="button" @click="judgeModal('new')") 新增優惠券
  .content
    .responsive
      table.table.table-hover
        thead.table-dark
          tr
            th 名稱
            th 折扣百分比
            th 到期日
            th 是否啟用
            th(width="140") 操作
        tbody
          tr(v-for="item in coupons" :key="item.id")
            td {{ item.title }}
            td {{ item.percent }}%
            td {{ date(item.due_date) }}
            td
              .text-success(v-if="item.is_enabled") 啟用
              .text-danger(v-else) 未啟用
            td
              .btn-group.btn-group-sm
                button.btn.btn-outline-primary(type="button" @click="judgeModal('edit',item)") 編輯
                button.btn.btn-outline-danger(type="button" @click="judgeModal('delete',item)") 刪除

    p.mb-2.length 目前有
      span.text-success  {{ coupons.length }}
      | 張優惠券

    //- 分頁
    Pagination(:pagination="pagination" @change-page="getCoupons")

    //- 新增&修改 Modal
    #couponModal.modal.fade(ref="couponModal" tabindex="-1")
      CouponModal(:temp="temp" :coupon-modal="couponModal" @get-coupons="getCoupons")

    //- 刪除 Modal
    #delCouponModal.modal.fade(ref='delModel' tabindex='-1')
      DelModal(:temp="temp" @get-coupons="getCoupons" :del-model="delModel")
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import Swal from 'sweetalert2'
import Pagination from '@/components/Pagination.vue'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      temp: {
        title: '',
        is_enabled: 0,
        percent: 0,
        code: ''
      },
      couponModal: '',
      delModel: '',
      isLoading: false
    }
  },
  components: {
    Pagination,
    CouponModal,
    DelModal
  },
  methods: {
    // 取得全部優惠券
    getCoupons (page = 1) {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`)
        .then(res => {
          this.coupons = res.data.coupons
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
    // Modal 判斷
    judgeModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.temp = {
            due_date: Math.floor(new Date().getTime() / 1000)
          }
          this.couponModal.show()
          break
        case 'edit':
          this.temp = { ...item }
          this.couponModal.show()
          break
        case 'delete':
          this.temp = { ...item }
          this.delModel.show()
          break
        default:
          break
      }
    }
  },
  created () {
    this.getCoupons()
  },
  mounted () {
    this.couponModal = new Modal(this.$refs.couponModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.delModel = new Modal(this.$refs.delModel, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
