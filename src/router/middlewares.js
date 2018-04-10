import $store from '../store'
import * as authService from '../services/auth.service'
import UsersService from '../services/users.service'

/**
 * Current user state initialization
 * @WARN Must be always first in middleware chain
 */
export function initCurrentUserStateMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser.id

  if (authService.getRefreshToken() && !currentUserId) {
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
export function checkAccessMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser.id
  const isAuthRoute = to.matched.some(item => item.meta.isAuth)

  if (isAuthRoute && currentUserId) return next()
  if (isAuthRoute) return next({name: 'login'})
  next()
}

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}
