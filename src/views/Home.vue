<template lang="pug">
.operateOuter
  Totop
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
      router-link(to="/") HOME \ 歡迎光臨
  section.headPic
    .swiper.mySwiper
      .swiper-wrapper
        .swiper-slide
          p.text HAPPY HOURS
            br/ 享受您的歡樂時刻
            span BREAD | COFFEE | CAKE
          img(src="img/home1.jpg" alt="HAPPY HOURS餐廳照")
        .swiper-slide
          p.text HAPPY HOURS
            br/ 享受您的歡樂時刻
            span BREAD | COFFEE | CAKE
          img(src="img/home2.jpg" alt="HAPPY HOURS餐廳照")
    .swiper-button-next
    .swiper-button-prev

  section.sincerely
    .content
      .icon
        i.fa-solid.fa-quote-right
      p.text 享受美食 | 享受當下 | 享受生活

  section.foodType
    .breadImg.commonImg(@click="category = '麵包';changeCategory()")
      .line
      .line2
      p.type BREAD
      p.title 嚐
        span 麵包
      p.subTitle 嚴選麵粉 | 精緻手工 | Q彈口感
    .otherImg
      .dessert.commonImg(@click="category = '甜點';changeCategory()")
        .line
        .line2
        p.type DESSERT
        p.title 品
          span 甜點
        p.subTitle 甜而不膩 | 幸福滋味 | 極致口感
      .beverage.commonImg(@click="category = '飲品';changeCategory()")
        .line
        .line2
        p.type BEVERAGE
        p.title 啜
          span 飲品
        p.subTitle 清新爽口 | 極致品味 | 沁涼口感
</template>

<script>
import Totop from '@/components/Totop.vue'
import CartNum from '@/components/CartNum.vue'
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.css'

export default {
  data () {
    return {
      swiper: '',
      swiper1: '',
      category: '',
      isLoading: false
    }
  },
  components: {
    Totop,
    CartNum
  },
  methods: {
    changeCategory () {
      this.$router.push({
        path: '/products',
        query: {
          tab: this.category
        }
      })
    }
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 500)

    this.swiper = new Swiper('.mySwiper', {
      effect: 'fade',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
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
