import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { message } from 'ant-design-vue'
import cookie from '@/utils/cookie'
import { logInFrom } from '@/type/login/login'
import {
  editPassword,
  getPagePermission,
  getUserMenus,
  login,
  LoginCheckByPhone,
  PeleplePasswordInitalize,
} from '@/api/interface/login'
import { hideBoot, showBoot } from '@/utils/dom/loading'
import loadDynamicRoutes from '@/router/load-dynamic-routes'
export const userStore = defineStore('user', {
  state: () => {
    return {
      userinfo: {},
      token: '',
      userRoutes: [] as any,
      removeRoutes: [],
      permissions: Object.create(null),
      visits: storage.getStorage('userinfo')?.loginsum || 0,
    }
  },
  actions: {
    // 更新token 方法
    changeToken(payload: any) {
      storage.setStorage('_token', payload)
      this.token = payload
    },
    // 设置
    setUserInfo(payload: any) {
      this.userinfo = payload
      const info: any = {}
      for (const key in payload) {
        if (key !== 'phonecode') info[key] = payload[key]
      }

      storage.setStorage('userinfo', info)
    },
    // 设置路由
    setUserRoutes(payload: RouteRecordRaw[]) {
      this.userRoutes = payload
      payload.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    // 退出登录 清空用户的信息
    logout() {
      // 移除现有的路由
      this.userRoutes.forEach((route: any) => {
        if (route.name) router.removeRoute(route.name)
      })
      this.permissions = []
      storage.delStorage('_token')
      cookie.delCookie('token_oa')
      storage.delStorage('userinfo')

      this.token = ''
      this.userRoutes = []
      this.userinfo = {}
      message.info('您已退出登录')
    },
    setPermission({ permission, id }: any) {
      this.permissions[id] = permission
    },

    async login(payload: logInFrom) {
      const loginRes = await login(payload)
      // 登录成功
      if (loginRes) {
        message.success('登录成功')
        // commit('setVisits', loginRes?.loginsum)
        this.setUserInfo(loginRes)
        loginRes.token && this.changeToken(loginRes.token)
        /* 获取路由权限
        if (state.userRoutes.length === 0)
          await dispatch('getUserMenus', loginRes.userid)
          */
        // 跳转到首页
        router.push('/')
        // return Promise.resolve();
      } else {
        message.error('登录失败，请重试')
      }
    },
    async loginByPhone(payload: any) {
      const loginRes = await LoginCheckByPhone(payload)

      // 登录成功
      if (loginRes) {
        // dispatch('setLoginOA', {
        //   username: loginRes.username,
        //   password: loginRes?.phonecode,
        // })
        message.success('登录成功')
        this.visits = loginRes?.loginsum
        this.setUserInfo(loginRes)
        loginRes.token && this.changeToken(loginRes.token)
        if (this.userRoutes.length === 0) await this.getUserMenus()
        // 跳转到首页
        router.push('/home-page')
        // return Promise.resolve();
      } else {
        message.error('登录失败，请重试')
      }
    },
    async getUserMenus() {
      showBoot()
      let usermenus = []
      try {
        usermenus = await getUserMenus()
        if (usermenus) {
          const userRoutes = loadDynamicRoutes(usermenus)
          message.success('欢迎回来')
          this.userRoutes = userRoutes
        }
      } finally {
        hideBoot()
      }
    },
    async getPermission({ commit, state }: any, to: RouteRecordRaw) {
      const id: any = to.meta?.id
      // 查询缓存
      if (!state.permissions[id]) {
        if (id) {
          const permission = await getPagePermission(id)
          commit('setPermission', { permission, id })
        }
      }
    },
    // 修改密码
    async editPassword(store: any, payload: any) {
      await editPassword(payload.id, { ...payload.params, ID: payload.id })
      message.success('修改密码成功，请重新登录')
      router.push('/login')
    },
    // 修改密码
    async resetPassword(store: any, payload: any) {
      await PeleplePasswordInitalize(payload.id)
      message.success('重置密码成功，请重新登录')
      router.push('/login')
    },
  },
})
