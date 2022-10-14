import { RouteRecordRaw } from 'vue-router'
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/layout/main/MainLayout.vue'),
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/login/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-fond" */ '@/views/errors-page/404.vue'),
  },
]

export default staticRoutes
