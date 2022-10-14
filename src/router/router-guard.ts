import { Router } from 'vue-router'
import storage from '@/utils/storage'
import { userStore } from '@/store/user'
const store: any = userStore()

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 隐藏加载圆圈
nprogress.configure({
  showSpinner: false,
  speed: 100,
})

export default function (router: Router) {
  router.beforeEach(async (to) => {
    nprogress.start()
    if (!(to.path === '/login')) {
      const token = storage.getStorage('_token')
      if (token) {
        // 没有加载过路由
        if (!store.userRoutes.length) {
          await store.getUserMenus(to.path)
          // await store.dispatch("user/getPermission", to);
          console.log(to.path)

          return {
            path: to.path,
            // replace: true,
          }
        } else {
          // await store.dispatch('user/getPermission', to)
          return true
        }
      } else {
        return '/login'
      }
    } else {
      return true
    }
  })

  router.afterEach(() => {
    nprogress.done()
  })
}
