<template>
  <component :is="bodyName" :size="size" :color="color"></component>
</template>

<script>
  import write from './write'
  import moon from './moon'
  import done from './done'
  import arrowDown from './arrowDown'

  export default {
    name: 'UiIconBase',
    props: {
      bodyName: {
        type: String,
        default: 'moon'
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
      moon,
      done,
      arrowDown
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
