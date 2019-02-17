<template>
  <div class="upload-single component">
    <input type="file" @change="makePreviewImage" accept="image/*" ref="file">
    <div v-if="previewImageData" class="preview">
      <img :src="previewImageData" alt="preview">
    </div>
    <button @click="upload">upload</button>
    <button @click="removeImage">remove image</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UploadSingle',
  data () {
    return {
      previewImageData: ''
    }
  },
  methods: {
    makePreviewImage (event) {
      // Reference to the DOM input element
      let input = event.target
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        let reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.previewImageData" refers to the previewImageData of Vue component
          // Read image as base64 and set to imageData
          this.previewImageData = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
      this.previewImageData = ''
    },
    upload () {
      // upload file only if we have file and we don't remove it from preview
      if (!this.$refs.file.files.length || !this.previewImageData) return

      const files = this.$refs.file.files
      const data = new FormData()
      data.append('logo', files[0])

      axios.post('http://localhost:8080/', data)
    },
    removeImage () {
      this.previewImageData = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-single {
  .preview {
    width: 300px;
  }
}
</style>
