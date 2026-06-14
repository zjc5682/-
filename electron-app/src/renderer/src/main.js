
import './assets/main.css'

//引入 UnoCSS
import 'virtual:uno.css'
//UI框架 ELement Plus
import ElementPlus from 'element-plus'

//1.导入 Element Plus Icon图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//导入路由
import router from './router'



import { createApp } from 'vue'
import App from './App.vue'

//导入 i18n国际化 配置
import i18n from './locales'


const app= createApp(App)

//使用路由
app.use(router)

app.use(i18n) //使用i18n

//全局注册 Element Plus Icon图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//全局注册 iconify 图标组件
import { Icon } from '@iconify/vue'
app.component('Icon',Icon)

app.mount('#app')