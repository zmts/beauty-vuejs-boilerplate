<template>
  <div class="ui-linear-loading component">
    <div class="progress progress-infinite">
      <div class="progress-bar" ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiLinearLoading'
}
</script>

<style lang="scss" scoped>
.ui-linear-loading.component {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  $green: #4cd964;
  $turquoise: #5ac8fa;
  $blue: #007aff;
  $light-blue: #7DC8E8;
  $purple: #5856d6;
  $red: #ff2d55;

  .progress-bar {
    height: 2px;
    background-image:
      linear-gradient(to right,
        $green, $turquoise, $blue,
        $light-blue, $purple, $red);
    transition: 0.4s linear;
    transition-property: width, background-color;
  }

  .progress-infinite .progress-bar {
    width: 100%;
    background-image:
      linear-gradient(to right, $green, $turquoise, $blue, $light-blue, $purple, $red);
    animation: colorAnimation 1s infinite;
  }

  @keyframes colorAnimation {
    0% {
      background-image:
        linear-gradient(to right, $green, $turquoise, $blue, $light-blue, $purple, $red);
    }
    20% {
      background-image:
        linear-gradient(to right, $turquoise, $blue, $light-blue, $purple, $red, $green);
    }
    40% {
      background-image:
        linear-gradient(to right, $blue, $light-blue, $purple, $red, $green, $turquoise);
    }
    60% {
      background-image:
        linear-gradient(to right, $light-blue, $purple, $red, $green, $turquoise, $blue);
    }
    100% {
      background-image:
        linear-gradient(to right, $purple, $red, $green, $turquoise, $blue, $light-blue);
    }
  }
}
</style>
