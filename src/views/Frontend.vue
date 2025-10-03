<template lang="pug">
.mainOuter
  FrontNavbar
  router-view
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    FrontNavbar
  }
}
</script>
