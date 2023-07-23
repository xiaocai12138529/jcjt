import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/utils/flexible-computer"
import registerIcons from "@/assets/andicon/index";

import "@/assets/icon/iconfont.css";
import AntDesign from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; 

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconList from '@element-plus/icons'

import '@/assets/styles/init.scss'
import '@/assets/styles/antd.scss'
import '@/assets/styles/global.scss'
import VueDragscroll from 'vue-dragscroll'
// 导入 svgIcon
import '@/assets/icons'  // 导入图标资源
import SvgIcon from '@/components/SvgIcon'// svg component
// dayjs 国际化
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
dayjs.locale('zh-cn')
// 在页面按需引入datav
// import { Decoration9 } from '@kjgl77/datav-vue3'

const app=createApp(App);
// 处理element-plus的icon
for (const name in ElIconList) {
    app.component(name, ElIconList[name])
}

//使用datav
// import { Decoration9 } from '@kjgl77/datav-vue3'

import './assets/icon/iconfont.js'
app.component('svg-icon', SvgIcon)
// FontAwesome图标库、、
import FontAwesomeIcon from "@/utils/fontawesomeUI"
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store).use(router).use(ElementPlus,{locale}).use(AntDesign).use(registerIcons).use(VueDragscroll);
app.mount('#app');
