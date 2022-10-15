import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/pull-value',
  name: 'pull-value',
  component: () =>
    import(
      /* webpackChunkName: " pull-value" */ '@/views/operation-data/pull-value/pull-value.vue'
    ),
  meta: {
    title: '限界及导高拉出值',
  },
}

export default route
