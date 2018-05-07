import Vue from 'vue'
import UiToast from '../../components/UiToast'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    /**
     * breakpoint constants
     */
    widthExtraSmall: 320,
    widthSmall: 640,
    widthTablet: 1024
  },

  mutations: {
    SET_WINDOW_WIDTH (state, value) {
      state.windowWidth = value
    },
    TOAST (state, payload) {
      let isPayloadString = typeof payload === 'string'
      let Toast = Vue.extend(UiToast)

      let newToast = new Toast({
        propsData: {
          message: isPayloadString ? payload : payload.message,
          duration: isPayloadString ? 5000 : payload.duration
        }
      }).$mount()
      document.querySelector('.ui-toast-list-wrapper').appendChild(newToast.$el)
    }
  },

  getters: {
    isExtraSmall: (state) => state.windowWidth <= state.widthExtraSmall,
    isSmall: (state) => state.windowWidth <= state.widthSmall,
    isTablet: (state) => state.windowWidth <= state.widthTablet,
    isDesktop: (state) => state.windowWidth > state.widthTablet
  }
}
