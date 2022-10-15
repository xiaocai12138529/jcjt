import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board/line',
  name: 'line',
  component: () =>
    import(/* webpackChunkName: "line" */ '@/views/board/line/line.vue'),
  meta: {
    title: '线路参数成果',
  },
}

export default route
