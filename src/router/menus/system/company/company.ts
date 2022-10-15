import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/system/company',
  name: 'company',
  component: () =>
    import(
      /* webpackChunkName: "company" */ '@/views/system/company/company.vue'
    ),
  meta: {
    title: '单位信息',
  },
}

export default route
