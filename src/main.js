import Vue from 'vue'

import AppLayout from './layout/index.vue'
import router from './router'
import store from './store'

import './mixins'
import './plugins'
import './thirdParty'

import './scss/style.scss'
import './assets/fonts/bebasneue.css'

Vue.config.productionTip = false

const commitWindowWidth = () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)

new Vue({
  name: 'Root',
  router,
  store,
  mounted () {
    commitWindowWidth()
    window.addEventListener('resize', commitWindowWidth)
  },

  beforeDestroy () {
    window.removeEventListener('resize', commitWindowWidth)
  },
  render: h => h(AppLayout)
}).$mount('#app')
