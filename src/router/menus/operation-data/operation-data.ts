import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data',
  name: 'operation-data',
  component: () =>
    import(
      /* webpackChunkName: "operation-data" */ '@/views/operation-data/index.vue'
    ),
  meta: {
    title: '工序数据管理',
  },
  redirect: '/operation-data/track',
}

export default route
