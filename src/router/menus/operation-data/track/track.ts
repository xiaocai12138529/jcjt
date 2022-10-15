import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/track',
  name: 'track',
  component: () =>
    import(
      /* webpackChunkName: " track" */ '@/views/operation-data/track/track.vue'
    ),
  meta: {
    title: '轨道几何参数',
  },
}

export default route
