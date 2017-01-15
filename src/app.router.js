import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

module.exports.router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'index',
            component: require('./components/index.component')
        },
        {
            path: '/news',
            name: 'news',
            component: require('./components/news.component')
        },
        {
            path: '*',
            component: require('./components/not-found.component')
        }
    ]
})
