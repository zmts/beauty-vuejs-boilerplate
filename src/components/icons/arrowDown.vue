<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 320 512">
    <g :fill="color">
    <path xmlns="http://www.w3.org/2000/svg" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: { type: String },
    height: { type: String },
    color: { type: String }
  }
}
</script>
