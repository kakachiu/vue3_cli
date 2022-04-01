<template lang="pug">
CartNum
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
        | 假日就是要放鬆，輸入 holiday，一起來放鬆
      .swiper-slide
        i.fa-solid.fa-bullhorn.bullhorn
        | 歡慶開幕，輸入 happyhours 優惠碼，將美食帶回家

  ul.breadcrumb
    li
      router-link(to="/products") FOOD \ 品嚐美食
  section.products
    ul.category
      li( :class="{'active': categoryText === '全部'}" @click="categoryText = '全部'") 全部
      li(title="麵包" :class="{'active': categoryText === '麵包'}" @click="categoryText = '麵包'") 麵包
      li(title="甜點" :class="{'active': categoryText === '甜點'}" @click="categoryText = '甜點'")  甜點
      li(title="飲品" :class="{'active': categoryText === '飲品'}" @click="categoryText = '飲品'") 飲品
    ul.productsContent
      li(v-for="item in categoryFilter" :key="item.id")
        router-link.head(:to="`/product/${item.id}`")
          .detail 查看
            br/ 美食內容
          .line
          .img
            img(:src="item.imageUrl" :alt="item.title")
          .tag {{ item.category }}
        .textContent
          .title {{ item.title }}
          .footer
            .priceOuter
              .salePrice(v-if="item.price === item.origin_price") {{ convertToAmount(item.price) }}
              div(v-else)
                .origin {{ convertToAmount(item.origin_price) }}
                .salePrice {{ convertToAmount(item.price) }}
            button.addBtn(type="button" @click="addCart(item.id)" :disabled="disable === item.id")
              span.spinner-grow.spinner-grow-sm.addLoading(v-if="addLoading")
              | 加入購物車
</template>

<script>
import Swal from 'sweetalert2'
import CartNum from '@/components/CartNum.vue'
import emitter from '@/libs/emitter.js'
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.css'

export default {
  data () {
    return {
      products: [],
      categoryText: '全部',
      disable: '',
      isLoading: false,
      addLoading: false,
      swiper: ''
    }
  },
  components: {
    CartNum
  },
  computed: {
    // 分類過濾
    categoryFilter () {
      const categoryFilter = this.products.filter(item => {
        if (this.categoryText === '全部') {
          return item
        } else {
          return item.category === this.categoryText
        }
      })
      return categoryFilter
    }
  },
  methods: {
    // 取得所有產品
    getProducts () {
      this.isLoading = true
      this.axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
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
    // 加入購物車
    addCart (id) {
      this.disable = id
      this.addLoading = true
      const cart = {
        product_id: id,
        qty: 1
      }
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data: cart })
        .then(res => {
          emitter.emit('addCart')
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
          this.addLoading = false
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
          this.addLoading = false
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
    this.getProducts()
  },
  mounted () {
    this.categoryText = this.$route.query.tab || this.categoryText
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
