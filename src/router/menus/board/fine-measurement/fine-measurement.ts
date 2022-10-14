import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board/fine-measurement',
  name: 'fine-measurement',
  component: () =>
    import(
      /* webpackChunkName: "fine-measurement" */ '@/views/board/fine-measurement/fine-measurement.vue'
    ),
  meta: {
    title: '精测网复测',
  },
}

export default route
