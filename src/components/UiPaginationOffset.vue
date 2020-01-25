<template>
  <ul class="ui-pagination-offset component">
    <li>
      <button class="nav-btn previous" @click="goToPrevPage" :disabled="isDisabledPrevBtn">
        <i class="material-icons">arrow_back</i>
      </button>
    </li>
    <li>
      <button class="nav-btn next" @click="goToNextPage" :disabled="isDisabledNextBtn">
        <i class="material-icons">arrow_forward</i>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UiPaginationOffset',

  props: {
    offset: {
      type: Number,
      default: 0,
      required: true
    },
    total: {
      type: Number,
      default: 0,
      required: true
    },
    limit: {
      type: Number,
      default: 0,
      required: true
    }
  },

  data () {
    return {
      currentOffset: this.offset
    }
  },

  methods: {
    goToNextPage () {
      this.currentOffset += this.limit
      this.$emit('update:offset', this.currentOffset)
    },
    goToPrevPage () {
      this.currentOffset -= this.limit
      this.$emit('update:offset', this.currentOffset)
    }
  },

  computed: {
    isDisabledNextBtn () {
      const stop = this.total - this.limit
      return this.currentOffset >= stop
    },
    isDisabledPrevBtn () {
      return this.currentOffset < this.limit
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-pagination-offset.component{
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  li {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      cursor: pointer;
      border: 1px solid $color-gray-300;
      color: $color-gray-300;
      &:hover {
        color: $color-gray-500;
        border: 1px solid $color-gray-500;
      }
      &:disabled {
        cursor: not-allowed;
        opacity: .5;
      }
    }
  }
}
</style>
