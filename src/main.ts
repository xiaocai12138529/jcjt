import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import VueParticles from 'vue-particles/src/vue-particles/index.js'

import registerIcons from '@/icons'

// 基础样式
import '@/assets/style/index.scss'
import '@/assets/icon/iconfont.css'
createApp(App)

const app = createApp(App)
app.use(router).use(Antd).use(createPinia())
app.use(router).use(Antd).use(VueParticles).use(registerIcons)
app.mount('#app')
