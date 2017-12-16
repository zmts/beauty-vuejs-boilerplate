<template>
  <div class="data-box component">
    <div v-if="loading" class="spinner-wrapper">
      <SpinnerWave></SpinnerWave>
    </div>
    <div :class="{'content': true, 'loading': loading}" v-if="!isEmpty && !error">
      <slot></slot>
    </div>

    <div :class="{'content': true, 'loading': loading}" v-if="isEmpty && !error" class="is-empty">
      <div class="smile">(>_<)</div>
      <div class="title">No content!</div>
    </div>

    <div class="content error" v-if="error">
      <div class="smile">(>_<)</div>
      <div class="title">Something wrong here!</div>
      <div class="error-msg">{{ error }}</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import SpinnerWave from './SpinnerWave.vue'

  export default {
    name: 'DataBox',
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      isEmpty: {
        type: Boolean,
        default: false
      },
      error: {
        type: [String, Boolean],
        default: false
      }
    },
    components: {SpinnerWave}
  }
</script>

<style scoped lang="scss">
  .data-box {
    position: relative;
    width: 100%;
    height: 100%;

    .content.loading {
      opacity: .3;
      pointer-events: none;
    }
    .spinner-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .is-empty, .error {
      text-align: center;
      padding: 30px;
      font-size: 16px;
      .title {
        font-size: 20px;
      }
      .smile {
        font-size: 120px;
        padding-bottom: 20px;
      }
    }

    .error {
      color: $color-error;
      .error-msg {
        padding-top: 10px;
      }
    }
  }
</style>
