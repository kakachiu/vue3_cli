<template lang="pug">
a.toTop(href="#" @click.prevent="toTop")
  i.fa-solid.fa-caret-up
</template>

<script>
export default {
  methods: {
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', function () {
      const toTop = document.querySelector('.toTop')
      if (window.scrollY >= 300) {
        toTop.classList.add('active')
      } else {
        toTop.classList.remove('active')
      }
    })
  }
}
</script>
