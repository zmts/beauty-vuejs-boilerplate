<template>
  <div class="ui-spinner-wave component">
    <div class="sk-wave">
      <div class="sk-rect sk-rect1" :style="loadingColor"></div>
      <div class="sk-rect sk-rect2" :style="loadingColor"></div>
      <div class="sk-rect sk-rect3" :style="loadingColor"></div>
      <div class="sk-rect sk-rect4" :style="loadingColor"></div>
      <div class="sk-rect sk-rect5" :style="loadingColor"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSpinnerWave',
  props: {
    color: {
      type: String,
      default: '#bebebe'
    }
  },
  computed: {
    loadingColor () {
      return {
        'background-color': this.color
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ui-spinner-wave {
  height: 100%;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

// https://github.com/tobiasahlin/SpinKit/blob/master/scss/spinners/3-wave.scss
$spinkit-spinner-margin: 0 auto !default;
$spinkit-size: 40px !default;
// $spinkit-spinner-color: #bebebe !default;

.sk-wave {
  $rectCount: 5;
  $animationDuration: 1.2s;
  $delayRange: 0.4s;
  margin: $spinkit-spinner-margin;
  width: $spinkit-size * 1.25;
  height: $spinkit-size;
  text-align: center;
  font-size: 10px;
  .sk-rect {
    // background-color: $spinkit-spinner-color;
    height: 100%;
    width: 6px;
    display: inline-block;
    animation: sk-waveStretchDelay $animationDuration infinite ease-in-out;
  }
  @for $i from 1 through $rectCount {
    .sk-rect#{$i} {
      animation-delay: - $animationDuration + $delayRange / ($rectCount - 1) * ($i - 1);
    }
  }
}

@keyframes sk-waveStretchDelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4)
  }
  20% {
    transform: scaleY(1.0)
  }
}
</style>
