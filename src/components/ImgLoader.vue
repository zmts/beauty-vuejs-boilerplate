<template>
  <div class="img-loader component">
    <img :src="src" :alt="alt" ref="image" v-show="!loading">
    <div class="loading" v-if="loading">
      <PulseLoading></PulseLoading>
    </div>
  </div>
</template>

<script>
  /**
   * @description Component check image loading status and show loading animation if image still not loaded
   */
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

    data () {
      return {
        loading: true,
        error: false
      }
    },

    methods: {
      checkLoadingStatus () {
        let interval = setInterval(() => {
          if (this.$refs.image) {
            this.loading = !this.$refs.image.complete

            if (!this.loading) {
              clearInterval(interval)
            }
          }
        }, 250)
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
