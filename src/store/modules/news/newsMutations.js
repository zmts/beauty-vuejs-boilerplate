export default {
  SET_ITEMS (state, data) {
    state.items = data
  },

  SET_PAGINATION (state, payload) {
    state.pagination = {
      page: payload.page || state.pagination.page,
      limit: payload.limit || state.pagination.limit,
      total: payload.total || state.pagination.total
    }
  },

  SET_ERROR (state, data) {
    state.error = data
  },

  SET_LOADING (state, data) {
    state.loading = data
  }
}
