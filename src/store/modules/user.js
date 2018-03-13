export default {
  namespaced: true,
  state: {
    currentUser: {
      id: '',
      role: '',
      name: '',
      email: ''
    }
  },

  mutations: {
    SET_CURRENT_USER (state, currentUserData) {
      state.currentUser = currentUserData
    }
  },

  getters: {
    getCurrentUser (state) {
      return state.currentUser
    }
  }
}
