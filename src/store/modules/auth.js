export default {
  namespaced: true,
  state: {
    accessTokenExpDate: ''
  },

  mutations: {
    SET_ATOKEN_EXP_DATE (state, expDate) {
      state.accessTokenExpDate = expDate
    }
  }
}
