<template>
  <div class="data-box component">
    <SpinnerWave class="spinner-wrapper" v-if="loading"></SpinnerWave>

    <div :class="{'data-box-content': true, 'loading': loading}" v-if="!isEmpty && !error">
      <slot></slot>
    </div>

    <div class="data-box-content is-empty" v-if="isEmpty && !error && !loading">
      <div class="smile">(O_o)</div>
      <div class="title">No content!</div>
    </div>

    <div class="data-box-content error" v-if="error">
      <div class="smile">(O_o)</div>
      <div class="title">Something wrong here!</div>
      <div class="error-msg">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import SpinnerWave from './progress-loaders/UiSpinnerWave.vue'

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
  components: { SpinnerWave }
}
</script>

<style scoped lang="scss">
.data-box.component {
  position: relative;
  width: 100%;
  height: 100%;
  .data-box-content {
    height: 100%;
  }
  .data-box-content.loading {
    min-height: 200px;
    opacity: .3;
    pointer-events: none;
  }
  .spinner-wrapper {
    position: absolute;
  }

  .is-empty, .error{
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
    color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .error-msg {
      padding-top: 10px;
    }
  }
}
</style>
