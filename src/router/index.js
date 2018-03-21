import Vue from 'vue'
import Router from 'vue-router'

import { routes } from './routes'
import $store from '../store'

import * as authService from '../services/auth.service'
import UsersService from '../services/users.service'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
})

/**
 * Current user state initialization and check permissions
 */
function initAppStateMiddleware (to, from, next) {
  // initialization for auth required routes
  if (to.matched.some(item => item.meta.isAuth)) {
    if (authService.getRefreshToken() && !$store.state.user.currentUser.id) {
      return authService.refreshTokens()
        .then(() => UsersService.getCurrent())
        .then(user => $store.commit('user/SET_CURRENT_USER', user.data))
        .then(() => next())
        .catch(error => console.log(error))
    }
    if ($store.state.user.currentUser.id) {
      return next()
    }
    return next({name: 'login'})
  }

  // initialization for public routes
  if (authService.getRefreshToken() && !$store.state.user.currentUser.id) {
    return authService.refreshTokens()
      .then(() => UsersService.getCurrent())
      .then(user => $store.commit('user/SET_CURRENT_USER', user.data))
      .then(() => next())
      .catch(error => console.log(error))
  }

  next()
}

function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)
  if (pageTitle) {
    window.document.title = pageTitle.meta.title
  }

  next()
}

router.beforeEach(setPageTitleMiddleware)
router.beforeEach(initAppStateMiddleware)

export default router
