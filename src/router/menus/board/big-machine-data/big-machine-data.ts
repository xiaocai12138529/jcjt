import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board/big-machine-data',
  name: 'big-machine-data',
  component: () =>
    import(
      /* webpackChunkName: "big-machine-data" */ '@/views/board/big-machine-data/big-machine-data.vue'
    ),
  meta: {
    title: '偏差查询大机数据',
  },
}

export default route
