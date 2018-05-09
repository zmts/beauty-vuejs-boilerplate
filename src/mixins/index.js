/**
 * import and init global mixins
 */

import Vue from 'vue'

import currentUser from '../mixins/currentUser'
import jumpTo from '../mixins/jumpTo'
import formatDateTime from '../mixins/formatDateTime'

Vue.mixin(currentUser)
Vue.mixin(jumpTo)
Vue.mixin(formatDateTime)
