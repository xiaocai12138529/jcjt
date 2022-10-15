import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/system/department-information',
  name: 'department-information',
  component: () =>
    import(
      /* webpackChunkName: "department-information" */ '@/views/system/department-information/department-information.vue'
    ),
  meta: {
    title: '部门信息',
  },
}

export default route
