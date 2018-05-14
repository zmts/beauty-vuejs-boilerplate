export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    /**
     * breakpoint constants
     */
    widthExtraSmall: 320,
    widthSmall: 640,
    widthTablet: 1024,
    toastsList: []
  },

  mutations: {
    SET_WINDOW_WIDTH (state, value) {
      state.windowWidth = value
    },
    TOAST (state, payload) {
      let toast = {
        id: new Date().getTime(),
        message: typeof payload === 'string' ? payload : payload.message,
        type: payload.type || 'default',
        duration: payload.duration || 5000
      }
      if (payload.type === 'error') {
        toast.duration = 0
        console.error(payload.message)
      }
      state.toastsList.push({ ...toast })
    },
    TOAST_REMOVE (state, payload) {
      state.toastsList = state.toastsList.filter(({id}) => id !== payload.id)
    },
    TOAST_LIST_CLEAR (state) {
      state.toastsList = []
    }
  },

  getters: {
    isExtraSmall: (state) => state.windowWidth <= state.widthExtraSmall,
    isSmall: (state) => state.windowWidth <= state.widthSmall,
    isTablet: (state) => state.windowWidth <= state.widthTablet,
    isDesktop: (state) => state.windowWidth > state.widthTablet
  }
}
