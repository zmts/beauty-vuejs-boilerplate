<template>
  <ul class="pagination component">
    <li><button class="nav-btn first" @click="goToPage(0)" :disabled="isDisabledPrevBtn">first</button></li>
    <li><button class="nav-btn previous" @click="goToPage(current - 1)" :disabled="isDisabledPrevBtn">prev</button></li>

    <li v-for="page in visiblePagesArray">
      <button
        @click="goToPage(page)"
        :disabled="current === page"
        :class="{ 'active': current === page }"
        class="item">
        {{ page + 1 }}
      </button>
    </li>

    <li><button class="nav-btn next" @click="goToPage(current + 1)" :disabled="isDisabledNextBtn">next</button></li>
    <li><button class="nav-btn last" @click="goToPage(pagesCount - 1)" :disabled="isDisabledNextBtn">last</button></li>

    <li class="info pages-counter">{{ current + 1 }}/{{ pagesCount }}</li>
    <li><span class="separator">|</span></li>
    <li class="info total-counter">Total: {{ total }}</li>
  </ul>
</template>

<script>
/**
 * @description Component compatibility developed with pagination that starts from 0 page
 */
export default {
  name: 'Pagination',
  props: {
    page: {
      /**
       * current page number
       */
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
    },
    /**
     * max count of pages button
     */
    maxPages: {
      type: Number,
      default: 5
    }
  },

  data () {
    return {
      current: this.page
    }
  },

  methods: {
    goToPage (pageNumber) {
      if ((pageNumber < 0) || (pageNumber > this.pagesCount)) return
      this.current = pageNumber
      this.$emit('update:page', this.current)
    }
  },

  computed: {
    pagesCount () { // divide total to limit
      // if haven't remainder
      if ((this.total % this.limit) === 0) return this.total / this.limit
      // if have remainder
      return parseInt(this.total / this.limit) + 1
    },
    pagesArray () {
      return Array.from(new Array(this.pagesCount)).map((item, key) => (item = key))
    },
    visiblePagesArray () {
      return this.pagesArray.slice(this.visiblePagesArrayFirstIndex, this.visiblePagesArrayLastIndex)
    },
    visiblePagesArrayFirstIndex () {
      const pagesArrayLengthMinusMaxPages = this.pagesArray.length - this.maxPages
      if ((this.current >= pagesArrayLengthMinusMaxPages) && (pagesArrayLengthMinusMaxPages > 0)) {
        return pagesArrayLengthMinusMaxPages
      }
      return this.current
    },
    visiblePagesArrayLastIndex () {
      const pagesArrayLengthMinusMaxPages = this.pagesArray.length - this.maxPages
      if (this.current >= pagesArrayLengthMinusMaxPages) {
        return this.pagesArray.length
      }
      return this.current + this.maxPages
    },
    isDisabledNextBtn () {
      return this.current === this.pagesCount - 1
    },
    isDisabledPrevBtn () {
      return !this.current
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination.component{
  display: flex;
  align-items: center;
  li {
    button {
      cursor: pointer;
      &:disabled {
        cursor: not-allowed;
      }
    }
  }
}
</style>
