import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/section',
  name: 'section',
  component: () =>
    import(
      /* webpackChunkName: " section" */ '@/views/operation-data/section/section.vue'
    ),
  meta: {
    title: '断面数据',
  },
}

export default route
