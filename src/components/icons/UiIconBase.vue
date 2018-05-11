<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 18 18">
    <g fill="currentColor">
      <component :is="bodyName"></component>
    </g>
  </svg>
</template>

<script>
  import write from './write'

  export default {
    name: 'UiIconBase',
    props: {
      bodyName: {
        type: String
      },
      size: {
        type: [Number, String],
        default: 18
      }
    },

    components: {
      write
    }
  }
</script>

<style lang="scss" scoped></style>
