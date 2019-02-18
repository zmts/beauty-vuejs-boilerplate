<template>
  <div class="ui-slider-stripe component">
    <div class="portal" :style="heightStyle">
      <div class="list" :style="listStyle">
        <div
          ref="slides"
          :class="{
          'is-before-active': indexBeforeActive === index,
          'is-active': indexActive === index,
          'is-after-active': indexAfterActive === index
          }"
          class="slide"
          v-for="(item, index) in images"
          :key="index">
          <img :style="heightStyle" :src="item" alt="">
        </div>
      </div>

      <div class="nav-prev" @click="goToPrev"></div>
      <div class="nav-next" @click="goToNext"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSliderStripe',

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
    },
    height: { type: String, default: '50vh' }
  },

  data () {
    return {
      indexActive: 1,

      windowInnerWidth: 0,
      horPosition: 0,
      fullMargin: 0
    }
  },

  methods: {
    reset () {
      this.indexActive = 1
      this.horPosition = 0
      this.fullMargin = 0
    },
    goToNext () {
      if (this.indexActive === this.itemsCount) return this.reset()

      this.horPosition = parseInt(this.horPosition - this.widthBeforeActiveImage)
      this.indexActive++
      this.fullMargin = parseInt(this.windowWidth - this.widthBeforeActiveImage)
    },
    goToPrev () {
      if (this.indexActive === 1) return this.reset()
      this.fullMargin = 0
      this.horPosition = parseInt(this.horPosition + this.widthBeforeActiveImage)
      this.indexActive--
    }
  },

  computed: {
    /**
     * width
     * width
     * width
     */
    widthBeforeActiveImage () {
      return this.$refs.slides[this.indexBeforeActive].offsetWidth
    },
    widthActiveImage () {
      return this.$refs.slides[this.indexActive].offsetWidth
    },
    widthAfterActiveImage () {
      return this.$refs.slides[this.indexAfterActive].offsetWidth
    },
    windowWidth () {
      return this.windowInnerWidth
    },
    marginLeft () {
      return parseInt(this.fullMargin / 2)
    },

    /**
     * indexes
     * indexes
     * indexes
     */
    indexBeforeActive () { // green
      return this.indexActive - 1
    },
    indexBeforeBeforeActive () { // green
      return this.indexBeforeActive - 1
    },
    indexAfterActive () { // yellow
      return this.indexActive + 1
    },

    /**
     * styles
     * styles
     * styles
     */
    heightStyle () {
      return `height: ${this.height}`
    },
    listStyle () {
      return `
      height: ${this.height};
      transform: translateX(${this.horPosition}px);
      margin-left: ${this.indexActive === 1 ? 0 : this.marginLeft}px;
    `
    },

    /**
     * other
     * other
     * other
     */
    itemsCount () {
      return this.images.length
    }
  },

  mounted () {
    this.windowInnerWidth = parseInt(window.innerWidth)
  }
}
</script>

<style lang="scss" scoped>
.ui-slider-stripe {
  .portal {
    position: relative;
    width: 100%;
    overflow: hidden;
    .nav-prev, .nav-next {
      cursor: pointer;
      top: 0;
      position: absolute;
      width: 10%;
      height: 100%;
      z-index: 1;
    }
    .nav-prev {
      left: 0;
    }
    .nav-next {
      right: 0;
    }
  }
  .list {
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    transition: all .4s;
    .slide {
      &.is-before-active {
        position: relative;
        &::before {
          position: absolute;
          content: 'before';
          width: 100%;
          height: 10%;
          display: block;
          background-color: rgba(green, .5);
        }
      }
      &.is-active {
        position: relative;
        &::before {
          position: absolute;
          content: 'active';
          width: 100%;
          height: 10%;
          display: block;
          background-color: rgba(red, .5);
        }
      }
      &.is-after-active {
        position: relative;
        &::before {
          position: absolute;
          content: 'after';
          width: 100%;
          height: 10%;
          display: block;
          background-color: rgba(yellow, .5);
        }
      }
    }
  }
}
</style>
