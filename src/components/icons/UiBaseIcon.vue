<template>
  <component
    :is="iconName"
    :width="width"
    :height="height"
    :color="color">
  </component>
</template>

<script>
  import write from './write'
  import moon from './moon'
  import done from './done'
  import arrowDown from './arrowDown'

  export default {
    name: 'UiIconBase',
    props: {
      iconName: {
        type: String,
        default: 'moon'
      },
      width: {
        type: String,
        default: '18px'
      },
      height: {
        type: String,
        default: '18px'
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
