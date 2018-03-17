export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    mobileMaxWidth: 320,
    tabletMaxWidth: 1000
  },

  mutations: {
    SET_WINDOW_WIDTH (state, value) {
      state.windowWidth = value
    }
  },

  getters: {
    isMobile: (state) => state.windowWidth <= state.mobileMaxWidth,
    isTablet: (state) => (state.windowWidth <= state.tabletMaxWidth) && (state.windowWidth > state.mobileMaxWidth)
  }
}
