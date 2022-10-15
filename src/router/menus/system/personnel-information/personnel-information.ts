import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/system/personnel-information',
  name: 'personnel-information',
  component: () =>
    import(
      /* webpackChunkName: "personnel-information" */ '@/views/system/personnel-information/personnel-information.vue'
    ),
  meta: {
    title: '人员信息',
  },
}

export default route
