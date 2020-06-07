<template>
  <div class="ui-pulse-loading component">
    <div class="sk-spinner sk-spinner-pulse"></div>
  </div>
</template>

<script>
export default {
  name: 'UiPulseLoading'
}
</script>

<style scoped lang="scss">
// https://github.com/tobiasahlin/SpinKit/blob/master/css/spinners/5-pulse.css

.sk-spinner-pulse {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 100%;
  -webkit-animation: sk-pulseScaleOut 1s infinite ease-in-out;
  animation: sk-pulseScaleOut 1s infinite ease-in-out; }

@-webkit-keyframes sk-pulseScaleOut {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0); }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0; } }

@keyframes sk-pulseScaleOut {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0); }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0; } }
</style>
