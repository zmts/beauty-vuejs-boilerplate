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
 * Current user state initialization
 * @WARN Must be always first in middleware chain
 */
function initCurrentUserStateMiddleware (to, from, next) {
  if (authService.getRefreshToken() && !$store.state.user.currentUser.id) {
    return authService.refreshTokens()
      .then(() => UsersService.getCurrent())
      .then(user => $store.commit('user/SET_CURRENT_USER', user.data))
      .then(() => next())
      .catch(error => console.log(error))
  }

  next()
}

/**
 * Check access permission to auth routes
 */
function checkAccessMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser.id
  const isAuthRoute = to.matched.some(item => item.meta.isAuth)

  if (isAuthRoute && currentUserId) return next()
  if (isAuthRoute) return next({name: 'login'})
  next()
}

function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)
  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}

router.beforeEach(initCurrentUserStateMiddleware)
router.beforeEach(checkAccessMiddleware)
router.beforeEach(setPageTitleMiddleware)

export default router
