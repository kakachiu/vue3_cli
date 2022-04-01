<template lang="pug">
main.mainContent.completeMain
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
      router-link(to="/cart") CART \ 購物車
  section.cartContent
    ul.progressContent
      li
        .number 01
        .text
          .en Check Order
          .cn 填寫資料
      li
        .number 02
        .text
          .en Check OrderInfo
          .cn 訂單確認
      li.active
        .number 03
        .text
          .en Order Complete
          .cn 完成訂單
    .orderComplete
      .textContent
        .icon
          i.fa-solid.fa-circle-check
        .title 付款成功
        .text 感謝您的訂購與喜愛
          br/ HAPPY HOURS 會持續努力做出更好的美食
          span
            i.fa-solid.fa-face-smile-wink
        router-link.continue(to="/products") 繼續購物
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  }
}
</script>
