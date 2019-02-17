<template>
  <div class="upload-multi component">
    <div class="top-tools">
      <input type="file" accept="image/*" @change="onChange" ref="filesContainer" multiple>
      <button @click="upload">upload</button>
      <button @click="resetSection">cancel</button>
    </div>
    <div class="loading-status">
      <div class="loading" v-if="loading">loading</div>
      <div class="done" v-if="done">loaded, all done</div>
      <div class="error" v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import forEach from 'lodash/forEach'
import Promise from 'bluebird'
import * as albumsApi from '../services/albums.service'

export default {
  name: 'UploadMulti',

  props: {
    entityId: {
      type: Number
    }
  },

  data () {
    return {
      loading: false,
      done: false,
      error: false,
      previewImageData: '',
      fileList: []
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
      this.resetAllStatuses()
    },
    onChange (event) {
      this.resetAllStatuses()
      if (event.target.files.length) {
        forEach(event.target.files, file => {
          this.fileList.push(file)
        })
      }
    },
    upload () {
      if (!this.fileList.length) return

      this.loading = true
      Promise.each(this.fileList, file => {
        const formData = new FormData()
        formData.append('photo', file)

        return albumsApi.uploadPhotoToAlbum(this.entityId, formData)
      }).then(response => {
        this.done = true
        this.$emit('uploaded')
      }).catch(error => {
        this.$snotify.error(error.message, 'Error')
        console.log(error)
      }).finally(() => {
        this.loading = false
        this.fileList = []
      })
    },
    resetSection () {
      this.previewImageData = ''
      this.resetAllStatuses()
      this.fileList = []
    },
    resetAllStatuses () {
      this.loading = false
      this.done = false
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-multi {
  .top-tools {
    padding: 15px 0;
    text-align: center;
  }
  .loading-status {
    text-align: center;
    padding-bottom: 15px;
    top: 40%;
    left: 45%;
    font-size: 16px;
  }
}

</style>
