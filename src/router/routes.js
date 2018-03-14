// profile
import profilePage from '../pages/profile/Profile.vue'
import postsPage from '../pages/profile/Posts.vue'

// single pages
import homePage from '../pages/Home.vue'
import newsPage from '../pages/News.vue'
import loginPage from '../pages/Login.vue'
import notFoundPage from '../pages/NotFound.vue'

import { routePropResolver } from './util'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: homePage
  },
  {
    path: '/news',
    name: 'news',
    component: newsPage,
    props: routePropResolver
  },
  {
    path: '/profile',
    component: profilePage,
    children: [
      {
        path: '',
        name: 'profile',
        component: postsPage
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: loginPage
  },
  {
    path: '*',
    component: notFoundPage
  }
]
