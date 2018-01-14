<template>
  <div class="img-loader component">
    <img :src="src" :alt="alt" ref="image" v-show="!error && !loading">
    <div class="loading" v-if="!error && loading">
      <PulseLoading></PulseLoading>
    </div>
    <div class="error" v-if="error && !loading">image loading fails. reload page</div>
  </div>
</template>

<script>
  /**
   * @description Component check image loading status and show loading animation if image still not loaded
   */
  import imagesloaded from 'imagesloaded'
  import PulseLoading from './PulseLoading.vue'

  export default {
    name: 'ImgLoader',
    components: {
      PulseLoading
    },
    props: {
      alt: {
        type: String
      },
      src: {
        type: String,
        required: true
      }
    },

    watch: {
      src: function () {
        this.checkLoadingStatus()
      }
    },

    data () {
      return {
        loading: true,
        error: false
      }
    },

    methods: {
      checkLoadingStatus () {
        imagesloaded(this.$refs.image, instance => {
          if (instance.hasAnyBroken) {
            this.error = true
          } else {
            this.error = false
          }
          this.loading = false
        })
      }
    },

    mounted () {
      this.checkLoadingStatus()
    }
  }
</script>

<style lang="scss" scoped>
  .img-loader.component {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
