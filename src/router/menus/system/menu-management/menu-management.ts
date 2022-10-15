import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/system/menu-management',
  name: 'menu-management',
  component: () =>
    import(
      /* webpackChunkName: "menu-management" */ '@/views/system/menu-management/menu-management.vue'
    ),
  meta: {
    title: '菜单管理',
  },
}

export default route
