import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import router from './router'

import ElementPlus, { ElMessage } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import Axios from './http'

const app = createApp(App)
// 给 axios 设置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'
app.config.globalProperties.$axios = Axios
app.config.globalProperties.$message = ElMessage;

app.use(router).use(store).use(ElementPlus).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
