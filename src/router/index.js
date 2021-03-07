import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'Category',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Category.vue'),
        children: [{
            path: '/',
            name: 'Classification',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Classification.vue'),
        }, {
            path: ':name',
            name: 'ClassificationLists',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/ClassificationLists.vue'),
        }]
    },
    {
        path: '/recommend/:id',
        name: 'Recommend',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Recommend.vue')
    },
    {
        path: '/ranking',
        name: 'Ranking',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Ranking.vue')
    },
    {
        path: '/search',
        name: 'Search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Search.vue')
    },
    {
        path: '/book/:id',
        name: 'Book',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Book.vue'),
        children: [{
            path: '/',
            name: 'Detail',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Detail.vue'),
        }, {
            path: 'chapter',
            name: 'Chapter',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Chapter.vue'),
        }, {
            path: 'read',
            name: 'Read',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Read.vue'),
        }]
    },

]

const router = new VueRouter({
    // mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router