<template lang="pug">
ul.pagination.justify-content-center
  li.page-item(:class="{'disabled': pagination.has_pre === false}")
    a.page-link(href="#" @click.prevent="changePage(pagination.current_page-1)")
      span «
  li.page-item(v-for="(item,key) in pagination.total_pages" :key="key" :class="{'active': item === pagination.current_page}")
    a.page-link(href="#" @click.prevent="changePage(item)") {{ item }}
  li.page-item(:class="{'disabled': pagination.has_next === false}")
    a.page-link(href="#" @click.prevent="changePage(pagination.current_page+1)")
      span »
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    changePage (page) {
      this.$emit('change-page', page)
    }
  }
}
</script>
