<template>
  <div class="ui-slider-single component">
    <div class="portal">
      <div class="list">
        <transition name="slide-fade">
          <div class="loading" v-show="loading">loading</div>
        </transition>
        <div class="slide">
          <img :src="images[indexActive]" alt="" ref="image">
        </div>
      </div>

      <div class="nav-prev" @click="goToPrev"></div>
      <div class="nav-next" @click="goToNext"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSliderSingle',

  props: {
    images: {
      type: Array,
      default: () => [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1513147122760-ad1d5bf68cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547994770-e5d8509b114d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1550143871-123059e5e5a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547958600-915c8a5131de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1549850499-aee3fb168c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547985510-593e2bdb0094?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547917818-5020d2e79c80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547880016-9c46f458266a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
      ]
    }
  },

  watch: {
    indexActive: {
      handler: 'checkLoadingStatus',
      immediate: true
    }
  },

  data () {
    return {
      error: false,
      indexActive: 0,
      loading: false
    }
  },

  methods: {
    reset () {
      this.indexActive = 0
    },
    goToNext () {
      if (this.indexActive === (this.itemsCount - 1)) return this.reset()
      this.indexActive++
    },
    goToPrev () {
      if (this.indexActive === 0) return
      this.indexActive--
    },
    checkLoadingStatus () {
      this.loading = true
      const interval = setInterval(() => {
        if (this.$refs.image && this.$refs.image.complete) {
          this.loading = false
          clearInterval(interval)
        }
      }, 200)
    }
  },

  computed: {
    itemsCount () {
      return this.images.length
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}

.ui-slider-single {
  width: 100%;
  .portal {
    position: relative;
    width: 100%;
    .nav-prev, .nav-next {
      cursor: pointer;
      top: 0;
      position: absolute;
      width: 30%;
      height: 100%;
      z-index: 1;
    }
    .nav-prev {
      left: 0;
    }
    .nav-next {
      right: 0;
    }

    .list {
      width: 100%;
      position: relative;
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(white, .8);
      }
      .slide {
        width: 100%;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>
