import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/accuracy-evaluation',
  name: 'accuracy-evaluation',
  component: () =>
    import(
      /* webpackChunkName: " accuracy-evaluation" */ '@/views/operation-data/accuracy-evaluation/accuracy-evaluation.vue'
    ),
  meta: {
    title: '拟合精度评定',
  },
}

export default route
