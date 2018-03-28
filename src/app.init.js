// third party
import Vue from 'vue'
import VueMaterial from 'vue-material'

// main
import AppLayout from './layout/index.vue'
import router from './router'
import store from './store'
import setGlobalHelpers from './global.helpers'
import globalEventBus from './plugins/globalEventBus'

// global components
import DataBox from './components/DataBox.vue'

// mixins
import currentUser from './mixins/currentUser'
import jumpTo from './mixins/jumpTo'

// styles
import 'vue-material/dist/vue-material.css'
import './assets/fonts/bebasneue.css'
import './scss/style.scss'

/**
 * ------------------------------
 * Initialization
 * ------------------------------
 */

setGlobalHelpers()
Vue.config.productionTip = false

// third party components
Vue.use(VueMaterial)

// plugins
Vue.use(globalEventBus)

// global components
Vue.component('UiDataBox', DataBox)

// global mixins
Vue.mixin(currentUser)
Vue.mixin(jumpTo)

/**
 * ------------------------------
 * App intance
 * ------------------------------
 */

/* eslint-disable no-new */
new Vue({
  name: 'Root',
  template: '<AppLayout/>',
  components: { AppLayout },
  el: '#app',
  router,
  store,

  mounted () {
    store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)
    window.addEventListener('resize', () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth))
  },

  beforeDestroy () {
    window.removeEventListener('resize', () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth))
  }
})
