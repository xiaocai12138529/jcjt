import { RouteRecordRaw } from 'vue-router'
import router from '.'
import { cloneDeep } from 'lodash'
export default function (userRoutes: any[]) {
  const allRoutes: RouteRecordRaw[] = []

  const routeFiles = require.context('./menus', true, /\.ts$/)

  routeFiles.keys().forEach((key) => {
    const route = require('./menus' + key.slice(1))
    allRoutes.push(route.default)
  })

  //  遍历用户的路由信息，动态添加路由到router
  function setChildrenRoute(root: RouteRecordRaw, routes: any[]) {
    routes.forEach((item) => {
      const childRoute = cloneDeep(allRoutes.find((r) => item.NAME === r?.name))

      if (childRoute) {
        // 设置标题
        childRoute.meta ? '' : (childRoute.meta = {})
        childRoute.meta.title = item?.TITLE
        childRoute.meta.id = item.ID
        // 设置子路由
        if (!root.children) root.children = []
        root.children.push(childRoute)

        if (item.REDRECT) {
          const rRoute = allRoutes.find((r) => r?.name === item.REDRECT)
          childRoute.redirect = rRoute?.path
        }
        if (item.CHILDREN) {
          setChildrenRoute(childRoute, item.CHILDREN)
        }
      }
    })
  }

  const rootRoute = {
    path: '/',
    redirect: '',
    children: [] as any[],
  }

  setChildrenRoute(rootRoute, userRoutes)
  const root = router.getRoutes().find((item) => item.name === 'main')
  if (root) {
    rootRoute.children.push(allRoutes.find((r) => 'news' === r.name))
    rootRoute.children.push(allRoutes.find((r) => 'grant' === r.name))
    root.redirect = '/'
  }
  const res = [].concat(...rootRoute.children)
  rootRoute.children = []
  return res
}
