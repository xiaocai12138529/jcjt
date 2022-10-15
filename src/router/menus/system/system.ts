import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: () =>
    import(/* webpackChunkName: "system" */ '@/views/system/index.vue'),
  meta: {
    title: '系统维护管理',
  },
  redirect: '/system/personnel-information',
}

export default route
