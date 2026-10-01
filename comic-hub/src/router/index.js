import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/comic',
        name: 'comic',
        component: () => import('@/views/Comic/Comic.vue'),
    },
    {
        path: '/comic/detail/:workCode',
        name: 'comicDetail',
        component: () => import('@/views/Comic/ComicDetail.vue'),
    },
    {
        path: '/comic/page/:contentCode',
        name: 'comicPage',
        component: () => import('@/views/Comic/ComicPage.vue'),
    },
    {
        path: '/management',
        name: 'management',
        component: () => import('@/views/Management/Management.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/NotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    },
})

export default router