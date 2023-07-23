import { createRouter, createWebHashHistory } from 'vue-router'
import routerGuard from "./router-guard"
const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import("@/layout/default-layout.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/index/index.vue"),
        meta: {
          title: "综合看板"
        }
      },

      {
        path: "/one-map",
        name: "oneMap",
        component: () => import("@/views/one-map/one-map-index"),
        meta: {
          title: "专题图分析"
        },
      },
      {
        path: "/bim-gis",
        name: "bim-gis",
        component: () => import("@/views/bim-gis/bim-gis"),
        meta: {
          title: "BIM+GIS展示"
        },
      },
      {
        path: "/account-management",
        name: "account-management",
        component: () => import("@/views/account-management/account-management"),
        meta: {
          title: "铁路台账"
        },
      },
      {
        path: "/basic-data",
        name: "basic-data",
        component: () => import("@/views/basic-data/basic-data"),
        meta: {
          title: "系统管理"
        },
      },
      {
        path: "/TQI-analysis",
        name: "TQI-analysis",
        component: () => import("@/views/TQI-analysis/TQI-analysis"),
        meta: {
          title: "精捣分析"
        },
      },
      {
        path: "/JDdata-management",
        name: "JDdata-management",
        component: () => import("@/views/JDdata-management/JDdata-management"),
        meta: {
          title: "精捣数据"
        },
      },

      // {
      //   path: "/one-map",
      //   name: "oneMap",
      //   component: () => import("@/views/one-map/one-map-index"),
      //   meta: {
      //     title: "一张图展示"
      //   },
      // },
      // {
      //   path: "/account-management",
      //   name: "account-management",
      //   component: () => import("@/views/account-management/account-management"),
      //   meta: {
      //     title: "工务台账管理"
      //   },
      // },
      // {
      //   path: "/track-detection",
      //   name: "track-detection",
      //   component: () => import("@/views/track-detection/track-detection"),
      //   meta: {
      //     title: "轨道现状检测"
      //   },
      // },
      // {
      //   path: "/basic-data",
      //   name: "basic-data",
      //   component: () => import("@/views/basic-data/basic-data"),
      //   meta: {
      //     title: "基础数据管理"
      //   },
      // },
      // {
      //   path: "/TQI-analysis",
      //   name: "TQI-analysis",
      //   component: () => import("@/views/TQI-analysis/TQI-analysis"),
      //   meta: {
      //     title: "TQI分析预测"
      //   },
      // },
      // {
      //   path: "/machine-maintenance",
      //   name: "machine-maintenance",
      //   component: () => import("@/views/machine-maintenance/machine-maintenance"),
      //   meta: {
      //     title: "大机捣固维修"
      //   },
      // },
      // {
      //   path: "/section-optimization",
      //   name: "section-optimization",
      //   component: () => import("@/views/section-optimization/section-optimization"),
      //   meta: {
      //     title: "平纵断面优化"
      //   },
      // },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error.vue"),
    meta: {
      title: "找不到页面",
    },
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
//  添加路由守卫
routerGuard(router)
export default router
