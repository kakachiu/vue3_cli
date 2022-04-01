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

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "./assets/sass/helpers/variables";
@import "~bootstrap/scss/bootstrap";

</style>
<style lang="sass">
@import "./assets/sass/all";
</style>
