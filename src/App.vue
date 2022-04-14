<template lang="pug">
router-view
</template>

<script>
export default {
  watch: {
    $route (to) {
      const nowTitle = to.meta.title
      document.title = nowTitle
    }
  }
}
</script>

<style lang="sass">
@import "./assets/sass/all";
</style>
