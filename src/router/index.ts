import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routeFiles = require.context('./menus', true, /\.ts$/)
const allRoutes: any = []
routeFiles.keys().forEach((key) => {
  const routes = require('./menus' + key.slice(1))
  allRoutes.push(routes.default)
})
const arr: any = []
const setChildrenRoute = (routes: any) => {
  routes.sort(
    (a: any, b: any) => a.path.split('/').length - b.path.split('/').length
  )

  routes.map((res: any) => {
    const path = res.path.split('/')
    if (path.length == 2) {
      arr.push(res)
    }
    if (path.length == 3) {
      const i = arr.findIndex((item: any) => item.name == path[1])
      if (!arr[i]?.children) arr[i]['children'] = []
      arr[i]['children'].unshift(res)
    }
  })
}

setChildrenRoute(allRoutes)
console.log(arr)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    meta: {
      title: '首页',
    },
    component: () => import('@/layout/main/MainLayout.vue'),
    // redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        meta: {
          isShow: true,
          title: '首页',
        },
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
      },
      {
        path: '/track-status-detection',
        name: 'track-status-detection',
        meta: {
          isShow: true,
          title: '轨道现状检测',
        },
        component: () =>
          import(
            /* webpackChunkName: "track-status-detection" */ '@/views/track-status-detection/index.vue'
          ),
        redirect: '/track-status-detection/inertial-navigation-track-detection',
        children: [
          {
            path: '/track-status-detection/inertial-navigation-track-detection',
            name: 'inertial-navigation-track-detection',
            meta: {
              title: '惯导轨道检测',
            },
            component: () =>
              import(
                /* webpackChunkName: "inertial-navigation-track-detection" */ '@/views/track-status-detection/inertial-navigation-track-detection/index.vue'
              ),
            redirect:
              '/track-status-detection/inertial-navigation-track-detection/gdjhxtcl',
            children: [
              {
                path: '/track-status-detection/inertial-navigation-track-detection/gdjhxtcl',
                name: 'gdjhxtcl',
                meta: {
                  title: '轨道几何形状测量',
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gdjhxtcl" */ '@/views/track-status-detection/inertial-navigation-track-detection/gdjhxtcl/index.vue'
                  ),
              },
            ],
          },
          {
            path: '/track-status-detection/move-3D-scan',
            name: 'move-3D-scan',
            meta: {
              title: '移动三维扫描',
            },
            component: () =>
              import(
                /* webpackChunkName: "move-3D-scan" */ '@/views/track-status-detection/move-3D-scan/index.vue'
              ),
            redirect: '/track-status-detection/move-3D-scan/dglcz',
            children: [
              {
                path: '/track-status-detection/move-3D-scan/dglcz',
                name: 'dglcz',
                meta: {
                  title: '导高拉出值',
                },
                component: () =>
                  import(
                    /* webpackChunkName: "dglcz" */ '@/views/track-status-detection/move-3D-scan/dglcz/index.vue'
                  ),
              },
              {
                path: '/track-status-detection/move-3D-scan/dzl',
                name: 'dzl',
                meta: {
                  title: '道砟量',
                },
                component: () =>
                  import(
                    /* webpackChunkName: "dzl" */ '@/views/track-status-detection/move-3D-scan/dzl/index.vue'
                  ),
              },
              {
                path: '/track-status-detection/move-3D-scan/gddm',
                name: 'gddm',
                meta: {
                  title: '轨道断面',
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gddm" */ '@/views/track-status-detection/move-3D-scan/gddm/index.vue'
                  ),
              },
            ],
          },
        ],
      },
      ...arr,
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-fond" */ '@/views/errors-page/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
