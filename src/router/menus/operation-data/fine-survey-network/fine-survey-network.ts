import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/operation-data/fine-survey-network',
  name: 'fine-survey-network',
  component: () =>
    import(
      /* webpackChunkName: " fine-survey-network" */ '@/views/operation-data/fine-survey-network/fine-survey-network.vue'
    ),
  meta: {
    title: '精测网复测',
  },
}

export default route
