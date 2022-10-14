import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board/plane',
  name: 'plane',
  component: () =>
    import(/* webpackChunkName: "plane" */ '@/views/board/plane/plane.vue'),
  meta: {
    title: '平面测点拨距',
  },
}

export default route
