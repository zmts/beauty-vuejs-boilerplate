<template>
  <div class="ui-toast component" @click="close">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'UiToast',
    props: {
      message: {
        type: String,
        default: 'Hello'
      },
      duration: {
        type: Number,
        default: 5000
      }
    },

    methods: {
      close () {
        this.$destroy()
      }
    },

    mounted () {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.close()
      }, this.duration)
    },

    destroyed () {
      this.$el.remove()
    }
  }
</script>

<style lang="scss">
  .ui-toast.component {
    padding: 20px;
    background-color: $color-white;
    border: 1px solid $color-line;
    margin: 20px;
  }
</style>
