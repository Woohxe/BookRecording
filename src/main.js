import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)
// 给 axios 设置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'
app.config.globalProperties.$axios = axios

app.mount('#app')
