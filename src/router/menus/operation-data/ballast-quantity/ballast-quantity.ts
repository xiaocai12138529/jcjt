import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/ballast-quantity',
  name: 'ballast-quantity',
  component: () =>
    import(
      /* webpackChunkName: " ballast-quantity" */ '@/views/operation-data/ballast-quantity/ballast-quantity.vue'
    ),
  meta: {
    title: '道砟量',
  },
}

export default route
