<template>
  <component :is="icon" :size="size" :color="color"></component>
</template>

<script>
  import write from './write'
  import moon from './moon'
  import done from './done'
  import arrowDown from './arrowDown'

  export default {
    name: 'UiIconBase',
    props: {
      icon: {
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
    }
  }
</script>

<style lang="scss" scoped></style>
