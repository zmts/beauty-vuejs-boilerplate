<template>
  <div
    class="ui-toast component"
    :class="classList"
    @click="remove">
    {{ item.message }}
  </div>
</template>

<script>
export default {
  name: 'UiToast',
  props: {
    item: {
      type: Object
    }
  },

  methods: {
    remove () {
      this.$emit('remove', this.item.id)
    }
  },

  computed: {
    classList () {
      return {
        default: this.item.type === 'default',
        success: this.item.type === 'success',
        info: this.item.type === 'info',
        warning: this.item.type === 'warning',
        error: this.item.type === 'error'
      }
    }
  },

  mounted () {
    if (this.item.duration) {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.remove()
      }, this.item.duration)
    }
  }
}
</script>

<style lang="scss">
.ui-toast.component {
  cursor: pointer;
  padding: 20px;
  background-color: $color-white;
  margin: 20px 0;
  &.default {
    border-left: 5px solid $color-line;
  }
  &.success {
    border-left: 5px solid green;
  }
  &.info {
    border-left: 5px solid blue;
  }
  &.warning {
    border-left: 5px solid orange;
  }
  &.error {
    border-left: 5px solid red;
  }
}
</style>
