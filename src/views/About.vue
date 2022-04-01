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
  ul.breadcrumb
    li
      router-link(to="/about") ABOUT \ 聊聊我們
  section.about
    .headImg
      p.title ABOUT HAPPY HOURS
    p.subject 在繁忙的生活中，多久沒有緩下腳步
      br/ 體驗生活中那些在身旁卻被遺忘的事物呢？
      br/ 時間一分一秒流逝，片刻短暫
      br/ 我們希望帶給您的是，讓您身心放鬆以及釋放壓力
      br/ 歡迎來找我們喝杯咖啡、來份甜點，聊聊您的故事。
    p.phoneText 在繁忙的生活中，多久沒有緩下腳步
      br/ 體驗生活中那些在身旁
      br/ 卻被遺忘的事物呢？
      br/ 時間一分一秒流逝，片刻短暫
      br/ 我們希望帶給您的是
      br/ 讓您身心放鬆以及釋放壓力
      br/ 歡迎來找我們喝杯咖啡
      br/ 來份甜點，聊聊您的故事。
    ul.aboutContent
      li
        .subTitle 食
        p.text 嚴選新鮮食材 | 為您健康把關
        ul.imgs
          li.first(data-aos="fade-up" data-aos-duration="3000")
            img.firstImg(src="img/about1.jpg" alt="食材")
          li.secondary(data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500")
            img.secondImg(src="img/about2.jpg" alt="麵包")
      li
        .subTitle 人
        p.text 專業團隊 | 手工製作
        ul.imgs
          li.first(data-aos="fade-up" data-aos-duration="3000")
            img.firstImg(src="img/about4.jpg" alt="手工麵包")
          li.secondary(data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500")
            img.secondImg(src="img/about3.jpg" alt="手工製作")
      li
        .subTitle 心
        p.text 我們用心 | 讓您放心
        ul.imgs
          li.first(data-aos="fade-up" data-aos-duration="3000")
            img.firstImg(src="img/about5.jpg" alt="專業廚師團隊")
          li.secondary(data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500")
            img.secondImg(src="img/about6.jpg" alt="專業廚師團隊")
      li
        p.smallText ENJOY YOUR LIFE & TIME
</template>

<script>
import AOS from 'aos/dist/aos.js'
import 'aos/dist/aos.css'
import CartNum from '@/components/CartNum.vue'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    CartNum
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 500)

    AOS.init()
  }
}
</script>
