// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/* eslint-disable no-new */
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: require('./components/index.component.vue'),
            children: [
                {
                    path: '/',
                    component: require('./components/home.component.vue')
                },
                {
                    path: 'news',
                    component: require('./components/news.component.vue')
                }
            ]
        },
        { path: '*', component: require('./components/not-found.component.vue') }
    ]
})

new Vue({
    template: '<root-component/>',
    components: {
        RootComponent: require('./root.component.vue')
    },
    router
}).$mount('#app')
