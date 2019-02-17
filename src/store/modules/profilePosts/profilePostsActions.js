import UsersService from '../../../services/users.service'

export default {
  getCurrentUserPosts ({ state, commit, rootState }, payload) {
    commit('SET_LOADING', true)
    return UsersService.getPostsByUserId(rootState.user.currentUser.id)
      .then(response => {
        commit('SET_ITEMS', response.data.content)
        commit('SET_PAGINATION', { total: response.data.total })
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  }
}
