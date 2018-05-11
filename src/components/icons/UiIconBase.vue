<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 18 18">
    <g :fill="color">
      <component :is="bodyName"></component>
    </g>
  </svg>
</template>

<script>
  import write from './write'
  import moon from './moon'

  export default {
    name: 'UiIconBase',
    props: {
      bodyName: {
        type: String
      },
      size: {
        type: [Number, String],
        default: 18
      },
      color: {
        type: String,
        default: 'currentColor'
      }
    },

    components: {
      write,
      moon
    },

    mounted () {
      let isValidBodyName = this.$children
        .map(item => item.$options._componentTag)
        .find(item => item === this.bodyName)

      if (!isValidBodyName) {
        throw new Error('Wrong bodyName param')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
