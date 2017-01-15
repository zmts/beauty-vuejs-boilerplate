import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: require('./components/index.component.vue')
        },
        {
            path: '/news',
            component: require('./components/news.component.vue')
        },
        {
            path: '*',
            component: require('./components/not-found.component.vue')
        }
    ]
})

new Vue({
    template: '<root-layout/>',
    components: {
        RootLayout: require('./root.layout.vue')
    },
    router
}).$mount('#app')
