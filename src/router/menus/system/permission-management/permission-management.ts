import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/system/permission-management',
  name: 'permission-management',
  component: () =>
    import(
      /* webpackChunkName: "permission-management" */ '@/views/system/permission-management/permission-management.vue'
    ),
  meta: {
    title: '权限管理',
  },
}

export default route
