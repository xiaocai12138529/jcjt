import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/system/log-management',
  name: 'log-management',
  component: () =>
    import(
      /* webpackChunkName: "log-management" */ '@/views/system/log-management/log-management.vue'
    ),
  meta: {
    title: '日志管理',
  },
}

export default route
