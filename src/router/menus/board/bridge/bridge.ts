import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board/bridge',
  name: 'bridge',
  component: () =>
    import(/* webpackChunkName: "bridge" */ '@/views/board/bridge/bridge.vue'),
  meta: {
    title: '桥梁偏心测量',
  },
}

export default route
