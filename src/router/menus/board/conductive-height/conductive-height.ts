import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/board/conductive-height',
  name: 'conductive-height',
  component: () =>
    import(
      /* webpackChunkName: "conductive-height" */ '@/views/board/conductive-height/conductive-height.vue'
    ),
  meta: {
    title: '限界及导高',
  },
}

export default route
