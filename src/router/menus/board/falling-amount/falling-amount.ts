import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board/falling-amount',
  name: 'falling-amount',
  component: () =>
    import(
      /* webpackChunkName: "falling-amount" */ '@/views/board/falling-amount/falling-amount.vue'
    ),
  meta: {
    title: '纵断面测点抬落量',
  },
}

export default route
