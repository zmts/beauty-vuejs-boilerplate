import Vue from 'vue'
const eventBus = new Vue()

export default {
  install (Vue) {
    Vue.prototype.$bus = eventBus
  }
}
