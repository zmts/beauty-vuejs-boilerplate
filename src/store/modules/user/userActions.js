import { UsersService } from '@/services/users.service'

export default {
  getCurrent ({ commit }) {
    return UsersService.getCurrent()
      .then(user => commit('SET_CURRENT_USER', user.data))
      .catch(error => commit('toast/NEW', { type: 'error', message: error.message }, { root: true }))
  }
}
