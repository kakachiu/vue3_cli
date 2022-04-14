<template lang="pug">
.modal-dialog.modal-xl
  .modal-content.border-0
    .modal-header.bg-info(v-if="!newTemp.id")
      h5#productModalLabel.modal-title
        span.text-light 新增產品
      button.btn-close(type="button" data-bs-dismiss="modal")
    .modal-header.bg-warning(v-else)
      h5#productModalLabel.modal-title
        span 編輯產品
      button.btn-close(type="button" data-bs-dismiss="modal")
    .modal-body
      .row
        .col-sm-4
          .mb-2
            .mb-3
              label.form-label(for="imageUrl") 輸入圖片網址
              input.form-control(type="text" placeholder="請輸入圖片連結" v-model="newTemp.imageUrl")
            img.img-fluid(:src="newTemp.imageUrl" :alt="newTemp.title")
            //- 單圖上傳 input
            label.uploadFile(for="uploadFile") 上傳圖片
              input#uploadFile.mb-3(type="file" ref="fileInput" @change="upload($event,'single')")
          div(v-if="newTemp.imagesUrl")
            h2(v-if="newTemp.imagesUrl.length") 更多圖片
            .mb-1(v-for="(image, index) in newTemp.imagesUrl" :key="index")
              .mb-3
                label.form-label(for="imageUrl") 圖片網址
                input.form-control.mb-2(v-model="newTemp.imagesUrl[index]" type="text" placeholder="請輸入圖片連結")
              img.img-fluid.mb-2(:src="image")
              //- 多圖上傳
              label.uploadFile.mb-2(for="uploadFile1" :disabled="disabled") 上傳圖片
                input#uploadFile.mb-3(type="file" ref="morefileInput" @change="upload($event,'morePic',index)")
              input.btn.btn-outline-danger.w-100(type="button" value="刪除圖片" @click="delImage(index)")

            div(v-if="!newTemp.imagesUrl.length || newTemp.imagesUrl[newTemp.imagesUrl.length - 1]")
              button.btn.btn-outline-primary.d-block.w-100(type="button" @click="newTemp.imagesUrl.push('')") 新增圖片

          div(v-else)
            button.btn.btn-outline-primary.d-block.w-100(type="button" @click="createImages") 新增圖片
        .col-sm-8
          .mb-3
            label.form-label(for="title") 標題
            input#title.form-control(type="text" placeholder="請輸入標題" v-model="newTemp.title")
          .row
            .mb-3.col-md-6
              label.form-label(for="category") 分類
              input#category.form-control(type="text" placeholder="請輸入分類" v-model="newTemp.category")
            .mb-3.col-md-6
              label.form-label(for="price") 單位
              input#unit.form-control(type="text" placeholder="請輸入單位" v-model="newTemp.unit")
          .row
            .mb-3.col-md-6
              label.form-label(for="origin_price") 原價
              input#origin_price.form-control(type="number" min="0" placeholder="請輸入原價" v-model.number="newTemp.origin_price")
            .mb-3.col-md-6
              label.form-label(for="price") 售價
              input#price.form-control(type="number" min="0" placeholder="請輸入售價" v-model.number="newTemp.price")
          hr
          .mb-3
            label.form-label(for="description") 產品描述
            textarea#description.form-control(type="text" placeholder="請輸入產品描述" v-model="newTemp.description")
          .mb-3
            label.form-label(for="content") 說明內容
            textarea#description.form-control(type="tex" placeholder="請輸入說明內容" v-model="newTemp.content")
          .mb-3
            .form-check
              input#is_enabled.form-check-input(type="checkbox" :true-value="1" :false-value="0" v-model="newTemp.is_enabled")
              label.form-check-label(for="is_enabled") 是否啟用
    .modal-footer
      button.btn.btn-outline-secondary(type="button" data-bs-dismiss="modal") 取消
      button.btn.btn-primary(type="button" @click="checkEdit") 確認
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      newTemp: {},
      disabled: false
    }
  },
  props: ['temp', 'productModal'],
  watch: {
    temp () {
      this.newTemp = JSON.parse(JSON.stringify(this.temp))
    }
  },
  methods: {
    upload (e, value, index) {
      this.disabled = true
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)

      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 200
          })
          Toast.fire({
            icon: 'success',
            title: '上傳成功'
          })
          if (value === 'single') {
            this.newTemp.imageUrl = res.data.imageUrl
            this.$refs.fileInput.value = ''
          } else {
            this.newTemp.imagesUrl[index] = res.data.imageUrl
            this.$refs.morefileInput[index].value = ''
          }
          this.disabled = false
        })
        .catch(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1400,
            width: 200
          })
          Toast.fire({
            icon: 'error',
            title: '上傳失敗'
          })
          this.disabled = false
        })
    },
    createImages () {
      this.newTemp.imagesUrl = []
      this.newTemp.imagesUrl.push('')
    },
    delImage (id) {
      this.newTemp.imagesUrl.splice(id, 1)
    },
    checkEdit () {
      if (!this.newTemp.id) {
        this.axios
          .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/`, { data: this.newTemp })
          .then(res => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1400,
              width: 220
            })
            Toast.fire({
              icon: 'success',
              title: res.data.message
            })
            this.productModal.hide()
            this.$emit('getProducts')
          })
          .catch(error => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1400,
              width: 320
            })
            Toast.fire({
              icon: 'error',
              title: error.response.data.message
            })
          })
      } else {
        this.axios
          .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.newTemp.id}`, {
            data: this.newTemp
          })
          .then(res => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1400,
              width: 220
            })
            Toast.fire({
              icon: 'success',
              title: res.data.message
            })
            this.productModal.hide()
            this.$emit('getProducts')
          })
          .catch(error => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1400,
              width: 320
            })
            Toast.fire({
              icon: 'error',
              title: error.response.data.message
            })
          })
      }
    }
  }
}
</script>
