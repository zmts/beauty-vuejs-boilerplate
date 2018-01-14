import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {
      id: '',
      role: '',
      name: '',
      email: ''
    },

    accessTokenExpDate: ''
  },

  actions: {},

  mutations: {
    SET_USER (state, accessTokenData) {
      state.userData = accessTokenData
    },

    SET_ATOKEN_EXP_DATE (state, expDate) {
      state.accessTokenExpDate = expDate
    }
  },

  getters: {
    userData (state) {
      return state.userData
    }
  },

  modules: {}
})
