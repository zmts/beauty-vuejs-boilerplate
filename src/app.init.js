// global imports
import Vue from 'vue'
import VueMaterial from 'vue-material'

// app imports
import AppLayout from './layout/index.vue'
import router from './router'
import store from './store'
import * as authService from './services/auth.service'
import { UsersService } from './services/users.service'
import globalHelpers from './global.helpers'

// mixins imports
import currentUser from './mixins/currentUser'

// styles imports
import 'vue-material/dist/vue-material.css'
import './assets/fonts/bebasneue.css'
import './scss/style.scss'

Vue.config.productionTip = false

globalHelpers()
Vue.use(VueMaterial)
Vue.mixin(currentUser)

/* eslint-disable no-new */
new Vue({
  name: 'Root',
  template: '<AppLayout/>',
  components: {AppLayout},
  el: '#app',
  router,
  store,

  created () {
    if (authService.getRefreshToken()) {
      this.initAppState()
    }
  },

  methods: {

    /**
     * refresh tokens and init userData in store
     */
    initAppState () {
      authService.refreshTokens()
        .then(() => UsersService.getCurrent())
        .then(user => store.commit('SET_USER', user.data))
        .catch(error => console.log(error))
    }
  }
})
