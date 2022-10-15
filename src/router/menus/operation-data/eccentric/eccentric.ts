import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/eccentric',
  name: 'eccentric',
  component: () =>
    import(
      /* webpackChunkName: " eccentric" */ '@/views/operation-data/eccentric/eccentric.vue'
    ),
  meta: {
    title: '桥梁偏心测量',
  },
}

export default route
