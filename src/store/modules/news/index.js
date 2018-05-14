import state from './newsState'
import mutations from './newsMutations'
import getters from './newsGetters'
import actions from './newsActions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
