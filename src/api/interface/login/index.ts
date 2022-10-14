import service from '@/api'

import type { ILoginObj, ILoginRes } from './types'
import storage from '@/utils/storage'
import { logInFrom } from '@/type/login/login'
export function login(loginObj: logInFrom) {
  // 登录  先移除旧的token
  storage.delStorage('_token')
  return service.post<ILoginRes>({
    url: 'login',
    data: loginObj,
  })
}
// 手机号登陆;
export function LoginCheckByPhone(loginObj: logInFrom) {
  // 登录  先移除旧的token
  storage.delStorage('_token')
  return service.post({
    url: 'login',
    data: loginObj,
  })
}

// 发送验证码
export function GetRand(params: any) {
  return service.get({ url: '/api/SystemMan/Login/GetRand', params })
}

// 获取用户的权限菜单
export function getUserMenus() {
  return service.get({ url: '/api/SystemMan/Menu/GetMenuByUserPower' })
}
// 获取页面的权限
export function getPagePermission(menuid: number) {
  return service.post({
    url: '/api/SystemMan/Power/MenuPermissions',
    params: { menuid },
  })
}
// 修改密码
export function editPassword(id: number, data: any) {
  return service.post({
    url: `/api/SystemMan/People/EnditPeleplePassword/${id}`,
    data,
  })
}
// 修改密码
export function PeleplePasswordInitalize(id: number) {
  return service.post({
    url: `/api/SystemMan/People/PeleplePasswordInitalize/${id}`,
  })
}
// 修改密码
export function FindPassWord(data: any) {
  return service.post({ url: `/api/SystemMan/Login/FindPassWord`, data })
}
