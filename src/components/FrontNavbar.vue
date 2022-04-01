<template lang="pug">
aside.slider(ref="slider")
  .menu
    h1.logo
      router-link(to="/" @click="closeSlider") HAPPY HOURS
      img.hook(src="img/hook.png" alt="HAPPY HOURS")
    ul.menuContent
      li
        router-link(to='/' @click="closeSlider")
          span.en.home HOME
          span.cn 歡迎光臨
      li
        router-link(to="/about" @click="closeSlider")
          span.en.about ABOUT
          span.cn 聊聊我們
      li
        router-link(to="/products" @click="closeSlider")
          span.en.food FOOD
          span.cn 品嚐美食
      li
        router-link(to="/contact" @click="closeSlider")
          span.en.contact CONTACT
          span.cn 做個朋友
    .socail
      router-link(to="/login")
        i.fa-solid.fa-user.member
      a(href="#")
        i.fa-brands.fa-facebook-square
      a(href="#")
        i.fa-brands.fa-instagram
      a(href="#")
        i.fa-solid.fa-envelope
    .backArrow(@click="closeSlider")
      i.fa-solid.fa-arrow-left-long BACK
  .copyRight Copyright © 2022 HAPPY HOURS. All rights reserved.

.padHead
  i.fa-solid.fa-bars.menuBar(@click="openSlider")
  router-link.logo(to="/")
    img(src="img/logo.jpg" alt="HAPPY HOURS")
</template>

<script>
export default {
  methods: {
    openSlider () {
      this.$refs.slider.classList.add('active')
    },
    closeSlider () {
      this.$refs.slider.classList.remove('active')
    }
  }
}
</script>
