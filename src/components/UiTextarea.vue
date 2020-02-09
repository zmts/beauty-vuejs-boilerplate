// use this component on server side via NO-SSR component
// based on: https://github.com/vuematerial/vue-material/blob/dev/src/components/MdField/MdTextarea/MdTextarea.vue

<template>
  <textarea
    class="ui-textarea component"
    :class="{ underline }"
    :style="textareaStyles"
    :placeholder="placeholder"
    @focus="applyStyles"
    @input="handleChange"
    v-model="localValue">
  </textarea>
</template>

<script>
export default {
  name: 'UiTextarea',
  props: {
    value: { type: String },
    placeholder: { type: String },
    underline: { type: Boolean, default: false },
    autosize: { type: Boolean, default: true },
    refresh: { type: [String, Number, Date] }
  },

  watch: {
    value (newVal) {
      this.localValue = newVal
      this.applyStyles()
    },
    refresh () {
      this.applyStyles()
    }
  },

  data () {
    return {
      localValue: this.value,
      textareaHeight: false
    }
  },

  methods: {
    handleChange (e) {
      this.$emit('input', e.target.value)
    },
    getTextAreaLineSize () {
      const style = window.getComputedStyle(this.$el)
      return parseInt(style.lineHeight, 10)
    },

    setTextAreaSize (height) {
      let newHeight = height
      if (!height) {
        const size = this.getTextAreaLineSize()
        newHeight = calculateContentHeight(this.$el, size)
      }
      this.textareaHeight = `${newHeight}px`
    },
    applyStyles () {
      if (this.autosize) {
        this.setTextAreaSize(40)
        this.$nextTick().then(() => this.setTextAreaSize())
      }
    }
  },

  computed: {
    textareaStyles () {
      return {
        height: this.textareaHeight
      }
    }
  },

  mounted () {
    this.$nextTick().then(() => this.applyStyles())
  }
}

function calculateContentHeight (el, lineHeight) {
  const origHeight = el.style.height
  const height = el.offsetHeight
  const scrollHeight = el.scrollHeight
  el.style.overflow = 'hidden'
  if (height >= scrollHeight) {
    el.style.height = (height + lineHeight) + 'px'
    if (scrollHeight < el.scrollHeight) {
      el.style.height = origHeight
      return height
    }
  }
  return scrollHeight
}
</script>

<style lang="scss" scoped>
.ui-textarea.component {
  font-size: 12px;
  font-weight: 300;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  border: 0;
  outline: none;
  padding: 0 10px;
  resize: none;
  background-color: inherit;
  font-family: inherit;
  color: inherit;
  overflow-x: hidden;
  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: $color-font-placeholder;
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: $color-font-placeholder;
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: $color-font-placeholder;
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: $color-font-placeholder;
  }
  &.underline {
    padding-bottom: 10px;
    border-bottom: 1px solid $color-line;
    &:focus {
      @include box-shadow;
      border-bottom: 1px solid $color-gray-100;
    }
  }
}
</style>
