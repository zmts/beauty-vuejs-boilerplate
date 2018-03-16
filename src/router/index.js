import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
})

function setPageTitle (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)
  if (pageTitle) {
    window.document.title = pageTitle.meta.title
  }

  next()
}

router.beforeEach(setPageTitle)

export default router
