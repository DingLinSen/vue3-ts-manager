import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入路由
import router from './router'
// 导入vuex
import { store, key } from './store'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(store, key)
app.mount('#app')
