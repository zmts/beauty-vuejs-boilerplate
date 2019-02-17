import PostsService from '../../../services/posts.service'

export default {
  getListPublic ({ state, commit }, payload) {
    commit('SET_LOADING', true)
    return PostsService.getListPublic(payload.params)
      .then(response => {
        commit('SET_ITEMS', response.data.content)
        commit('SET_PAGINATION', { total: response.data.total })
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  }
}
