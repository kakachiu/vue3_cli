<template lang="pug">
main.mainContent
  loading(:active="isLoading")
    .loadingOuter
      .load
        div
        div
        div
        div
        div

  .swiper.mySwiper1
    .swiper-wrapper
      .swiper-slide
        i.fa-solid.fa-bullhorn.bullhorn
        | 假日就是要放鬆，結帳輸入 holiday 優惠碼，一起來放鬆
      .swiper-slide
        i.fa-solid.fa-bullhorn.bullhorn
        | 歡慶開幕，結帳輸入 happyhours 優惠碼，將美食帶回家

  ul.breadcrumb
    li
      router-link(to="/cart") CART \ 購物車
  section.cartContent
    template(v-if="allCarts.carts.length")
      ul.progressContent
        li.active
          .number 01
          .text
            .en Check Order
            .cn 填寫資料
        li
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
          .head
            .title 購物清單
            .delAll(@click="judgeModal('delAll')") 全部刪除
          .listTableOuter
            table.table.table-hover.listTable
              tbody
                tr(v-for="(item,index) in allCarts.carts" :key="item.id")
                  td.imgTd
                    img.img(:src="item.product.imageUrl" :alt="item.product.title")
                  td.textTd
                    .name {{ item.product.title }}
                    .numberOuter
                      .number 數量：
                        span {{ item.qty }}
                      .num
                        .add(@click="addNum(item,index)" :class="{'active': disable === item.id}")
                          i.fa-solid.fa-plus
                        .min(@click="miunsNum(item,index)" ref="min" :class="{'active': disable === item.id}")
                          i.fa-solid.fa-minus
                  td.price {{ convertToAmount(item.total) }}
                  td
                    i.fa-solid.fa-trash-can.delete(@click="judgeModal('delete',item)")
          .btn-group.coupon
            input(type="text" placeholder="輸入優惠券代碼" v-model="code")
            .btn-group.couponBtn
              button.btn(type='button' @click="addCoupon" :disabled="couponDisabled === 'disabled'")
                | 套用優惠券
          .priceOuter
            .totalPrice 總金額
              span {{ convertToAmount(allCarts.total) }}
            .discountPrice 折扣後金額
              span {{ convertToAmount(allCarts.final_total) }}

        .formOuter
          .title 填寫購買資訊
          Form.form(v-slot="{ errors }" @submit="sendOrder" ref="form")
            label(for="name") 姓名
              sup *
            Field#name.form-control(type="text" name="姓名" :class="{ 'is-invalid': errors['姓名'] }" placeholder="HAPPY HOURS" rules="required" v-model="user.name")
            error-message.invalid-feedback(name="姓名")

            label(for="email") 聯絡信箱
              sup *
            Field#email.form-control(type="email" name="E-MAIL" :class="{ 'is-invalid': errors['E-MAIL'] }" placeholder="happyhours@example.com" rules="email|required" v-model="user.email")
            error-message.invalid-feedback(name="E-MAIL")

            label(for="tel") 聯絡電話
              sup *
            Field#tel.form-control(name='電話' type='tel' :class="{ 'is-invalid': errors['電話'] }" placeholder='0912345678' :rules="isPhone" v-model="user.tel")
            error-message.invalid-feedback(name='電話')

            label(for="address") 收件地址
              sup *
            Field#address.form-control(type="text" name="收件地址" :class="{ 'is-invalid': errors['收件地址'] }" placeholder="請輸入收件地址" rules="required" v-model="user.address")
            error-message.invalid-feedback(name="收件地址")

            label(for="message") 備註
            textarea#message(placeholder="歡迎留下想說的話.." v-model="message")
            input.orderBtn(type="submit" value="送出訂單" :disabled="Object.keys(errors).length > 0 || allCarts.total === 0")

    template(v-else)
      router-link.goShop(to="/products")
        p.text  購物車無商品
          br/ 前往購物
          i.fa-solid.fa-circle-right.arrowRight

    //- 刪除 Modal
    #delCartModal.modal.fade(ref="delCartModal" tabindex="-1")
      DelModal(:temp="temp" @get-carts="getCarts" :del-model="delModel")

    //- 刪除全部 Modal
    #CartAllDel.modal.fade(ref="CartAllDel" tabindex="-1")
      DelAllModal(@del-all-cart="delAllCart")
</template>

<script>
import Swal from 'sweetalert2'
import Modal from 'bootstrap/js/dist/modal'
import DelModal from '@/components/DelModal.vue'
import DelAllModal from '@/components/DelAllModal.vue'
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.css'

export default {
  data () {
    return {
      allCarts: {
        carts: [],
        total: 0,
        final_total: 0,
        qty: 0
      },
      code: '',
      temp: {},
      user: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      message: '',
      isLoading: false,
      delModel: '',
      cartAllDel: '',
      disable: '',
      couponDisabled: '',
      swiper: ''
    }
  },
  components: {
    DelModal,
    DelAllModal
  },
  methods: {
    // 送出訂單
    sendOrder () {
      const orderInfo = {
        user: this.user,
        message: this.message
      }
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: orderInfo })
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
          // 回傳成功會獲得訂單 id ，取得訂單 id 後再轉到個別訂單頁面
          const orderId = res.data.orderId
          setTimeout(() => {
            this.$router.push(`/order-info/${orderId}`)
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
        })
      this.$refs.form.resetForm()
      this.message = ''
    },
    // 手機驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確手機號碼'
    },
    // Modal 判斷
    judgeModal (isNew, item) {
      switch (isNew) {
        case 'delete':
          this.temp = { ...item }
          this.delModel.show()
          break
        case 'delAll':
          this.cartAllDel.show()
          break
        default:
          break
      }
    },
    // 優惠券
    addCoupon () {
      this.couponDisabled = 'disabled'
      const couponData = {
        code: this.code
      }
      if (this.code === '') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1400,
          width: 280
        })
        Toast.fire({
          icon: 'error',
          title: '請輸入優惠券代碼'
        })
        setTimeout(() => {
          this.couponDisabled = ''
        }, 1400)
        return false
      }
      this.axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, { data: couponData })
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 320
          })
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.code = ''
          this.couponDisabled = ''
          this.getCarts()
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
          this.code = ''
          this.couponDisabled = ''
        })
    },
    // 刪除全部購物車
    delAllCart () {
      this.axios
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
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
          this.getCarts()
          this.cartAllDel.hide()
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
    },
    addNum (item, index) {
      item.qty += 1
      // 要獲得是要點擊哪一筆，所以帶入索引
      this.$refs.min[index].classList.remove('active')
      this.update(item)
    },
    miunsNum (item, index) {
      if (item.qty === 1) {
        item.qty = 1
        // 要獲得是要點擊哪一筆，所以帶入索引
        this.$refs.min[index].classList.add('active')
      } else {
        item.qty -= 1
        this.update(item)
      }
    },
    // 更新購物車數量
    update (item) {
      this.disable = item.id
      const upsateCart = {
        product_id: item.product_id,
        qty: parseInt(item.qty)
      }
      this.axios
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data: upsateCart })
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
          this.getCarts()
          this.disable = ''
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
    // 取得全部購物車
    getCarts () {
      this.isLoading = true
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          this.allCarts = res.data.data
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
      return 'NT$ ' + parts.join('.')
    }
  },
  created () {
    this.getCarts()
  },
  mounted () {
    this.delModel = new Modal(this.$refs.delCartModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.cartAllDel = new Modal(this.$refs.CartAllDel, {
      keyboard: false,
      backdrop: 'static'
    })
    this.swiper = new Swiper('.mySwiper1', {
      direction: 'vertical',
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      observer: true,
      observeParents: true
    })
  }
}
</script>
