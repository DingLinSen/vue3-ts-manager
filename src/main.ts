import { createApp,createVNode } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

// 引入Icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册Icon图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

// Object.keys(ElementPlusIconsVue).forEach((key) => {
//   app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue])
// })

const Icon = (props: { icon: string }) => {
  const { icon } = props
  return createVNode(ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue])
}
app.component('Icon', Icon)

// 导入路由
import router from './router'

// 导入vuex
import { store, key } from './store'

app.use(router)
app.use(ElementPlus)
app.use(store, key)
app.mount('#app')
