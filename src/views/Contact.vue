<template lang="pug">
main.mainContent.contactMain
  ul.breadcrumb
    li
      router-link(to="/contact") CONTACT \ 做個朋友
  section.contactOuter
    .envelope
      img(src="img/envelope.jpg" alt="聯絡我們")
    .contactForm
      p.title DEAR HAPPY HOURS
      Form.form(v-slot="{ errors }" @submit="sendMessage" ref="sendMessage")
        label(for="name") 姓名
        Field#name.form-control(type="text" name="姓名" :class="{ 'is-invalid': errors['姓名'] }" placeholder="HAPPY HOURS" rules="required")
        error-message.invalid-feedback(name="姓名")

        label(for="email") 聯絡信箱
        Field#email.form-control(type="email" name="E-MAIL" :class="{ 'is-invalid': errors['E-MAIL'] }" placeholder="happyhours@example.com" rules="email|required" )
        error-message.invalid-feedback(name="E-MAIL")

        label(for="message") 想說的話
        textarea#message(placeholder="說點什麼...")
        input.sendBtn(type="submit" value="送出" :disabled="Object.keys(errors).length > 0")
    .contactInfo
      .line
      h2.title 聯絡我們
      p.subTitle 如果您有任何的想法與建議，隨時與我們聯繫~
      .contacContent
        p 營業時間：AM 12：00 ~ PM 09：00
        p 連絡電話：02-2666-6666
        p 地址：基隆市安樂區湖海路二段145號
</template>

<script>
import Swal from 'sweetalert2'

export default {
  methods: {
    sendMessage () {
      Swal.fire({
        icon: 'success',
        title: '<strong>很高興您的來信，<br/>我們會於上班時間回覆您~</strong>',
        width: 410,
        confirmButtonColor: '#333131',
        allowOutsideClick: false
      })
    }
  }
}
</script>
