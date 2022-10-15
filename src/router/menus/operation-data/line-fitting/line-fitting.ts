import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/line-fitting',
  name: 'line-fitting',
  component: () =>
    import(
      /* webpackChunkName: " line-fitting" */ '@/views/operation-data/line-fitting/line-fitting.vue'
    ),
  meta: {
    title: '线路拟合数据',
  },
}

export default route
