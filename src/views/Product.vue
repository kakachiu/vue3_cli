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
        | 假日就是要放鬆，結帳輸入 holiday 優惠碼，一起來放鬆
      .swiper-slide
        i.fa-solid.fa-bullhorn.bullhorn
        | 歡慶開幕，結帳輸入 happyhours 優惠碼，將美食帶回家

  ul.breadcrumb
    li
      router-link(to="/products") FOOD \ 品嚐美食
  section.product
    ul.productBreadcrumb
      li
        router-link(to="/products") 品嚐美食 /
      li
        router-link(to="/products" @click="category = product.category;changeCategory()") {{ product.category }} /
      li.productName  {{ product.title }}
    .productContent
      .img
        .line
        img(:src="product.imageUrl" :alt="product.title")
      .content
        .head
          h2.title {{ product.title }}
          .badge {{ product.category }}
        .priceOuter
          .salePrice(v-if="product.price === product.origin_price") {{ convertToAmount(product.price) }}
          div(v-else)
            .originPrice {{ convertToAmount(product.origin_price) }}
            .salePrice {{ convertToAmount(product.price) }}
        .textContent {{ product.description }}
        .number
          .min(@click="minusNum" ref="minusNum")
            i.fa-solid.fa-minus
          input.num(type="number" v-model.number="num"  min="1" ref="numInput" @click="change")
          .add(@click="addNum")
            i.fa-solid.fa-plus
        button.addCart(type="button" @click="addCard(product.id)" :disabled="disable === product.id")
          span.spinner-grow.spinner-grow-sm.addLoading(v-if="addLoading")
          | 加入購物車
    .otherProducts
      h4.title 您可能會喜歡..
      .content
        .swiper.mySwiper
          ul.swiper-wrapper
            li.swiper-slide(v-for="item in categoryFilter" :key="item.id")
              router-link(:to="`/product/${item.id}`" @click="changeFood(item.id)")
                .tag {{ convertToAmount(item.price) }}
                .img
                  img(:src="item.imageUrl" :alt="item.title")
                .text {{ item.title }}
        .swiper-button-next
        .swiper-button-prev
</template>

<script>
import Swal from 'sweetalert2'
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.css'
import emitter from '@/libs/emitter.js'
import CartNum from '@/components/CartNum.vue'

export default {
  data () {
    return {
      product: {
        origin_price: 0,
        price: 0
      },
      num: 1,
      products: [],
      swiper: '',
      swiper1: '',
      isLoading: false,
      disable: '',
      addLoading: false,
      category: ''
    }
  },
  components: {
    CartNum
  },
  computed: {
    categoryFilter () {
      const category = this.products.filter(item => {
        return item.category === this.product.category
      })
      return category
    }
  },
  methods: {
    change () {
      const input = this.$refs.numInput
      const minusNum = this.$refs.minusNum
      input.addEventListener('input', function (e) {
        if (this.value === '0' || this.value.includes('-') || this.value === '') {
          this.value = 1
          minusNum.classList.add('active')
        }
      })
    },
    changeCategory () {
      this.$router.push({
        path: '/products',
        query: {
          tab: this.category
        }
      })
    },
    changeFood (id) {
      this.$route.params.id = id
      this.getProduct()
      this.num = 1
      this.$refs.minusNum.classList.remove('active')
    },
    addNum () {
      if (this.num === '0' || this.num < 1) {
        this.num = 1
      } else {
        this.num += 1
        this.$refs.minusNum.classList.remove('active')
      }
    },
    minusNum () {
      if (this.num === 1) {
        this.$refs.minusNum.classList.add('active')
        this.num = 1
      } else {
        this.num -= 1
      }
    },
    // 取得單一產品
    getProduct () {
      this.isLoading = true
      const id = this.$route.params.id
      this.axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
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
    addCard (id) {
      this.disable = id
      this.addLoading = true
      const addCart = {
        product_id: id,
        qty: parseInt(this.num)
      }
      this.axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data: addCart })
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
    this.getProduct()
    this.getProducts()
  },
  mounted () {
    this.swiper = new Swiper('.mySwiper', {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        1025: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        630: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        }
      },
      observer: true,
      observeParents: true
    })

    this.swiper1 = new Swiper('.mySwiper1', {
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
