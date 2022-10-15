import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/optimize-data',
  name: 'optimize-data',
  component: () =>
    import(
      /* webpackChunkName: " optimize-data" */ '@/views/operation-data/optimize-data/optimize-data.vue'
    ),
  meta: {
    title: '偏差优化数据',
  },
}

export default route
