import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board',
  name: 'board',
  component: () =>
    import(/* webpackChunkName: "board" */ '@/views/board/index.vue'),
  meta: {
    title: '综合信息看板',
  },
  redirect: '/board/plane',
}

export default route
