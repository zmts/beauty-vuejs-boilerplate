/**
 * toast notification module
 */
export default {
  namespaced: true,
  state: {
    toastsList: []
  },

  mutations: {
    NEW (state, payload) {
      const toast = {
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
    REMOVE (state, payload) {
      state.toastsList = state.toastsList.filter(({ id }) => id !== payload.id)
    },
    CLEAR_LIST (state) {
      state.toastsList = []
    }
  }
}
