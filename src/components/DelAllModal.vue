<template lang="pug">
.modal-dialog
  .modal-content.border-0
    .modal-header.bg-danger
      h5#delAllOrderModal.modal-title(v-if="delText === 'delAll'")
        span.text-light 刪除訂單
      h5#delAllCartModal.modal-title(v-else)
        span.text-light 刪除購物車
      button.btn-close(type="button" data-bs-dismiss="modal")
    .modal-body(v-if="delText === 'delAll'")
      strong.text-danger 是否刪除全部訂單
      | (刪除後將無法恢復)。
    .modal-body(v-else)
      | 是否刪除
      strong.text-danger 全部購物車商品
      |  (刪除後將無法恢復)。
    .modal-footer
      button.btn.btn-outline-secondary(type="button" data-bs-dismiss="modal") 取消
      button.btn.btn-danger(type="button" v-if="delText === 'delAll'" @click="delAllOrder") 確認刪除
      button.btn.btn-danger(type="button" v-else @click="delAllCart") 確認刪除
</template>

<script>
export default {
  props: ['delText'],
  methods: {
    delAllOrder () {
      this.$emit('delAllOrder')
    },
    delAllCart () {
      this.$emit('delAllCart')
    }
  }
}
</script>
