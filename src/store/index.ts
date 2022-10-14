import storage from '@/utils/storage'
import { userStore } from './user'
import { defineStore } from 'pinia'
const store: any = userStore()
export const indexStore = defineStore('index', {
  state: () => {
    return {}
  },
})
// 初始化用户信息
export async function setUpUser() {
  const token = storage.getStorage('_token')
  const userinfo = storage.getStorage('userinfo')
  if (token && userinfo) {
    // 已经登陆
    store.setUserInfo(userinfo)
    store.changeToken(token)
  } else {
    return Promise.reject()
  }
}
