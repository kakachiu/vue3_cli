<template lang="pug">
.mainOuter
  FrontNavbar
  Totop
  router-view
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import Totop from '@/components/Totop.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    FrontNavbar,
    Totop
  }
}
</script>
