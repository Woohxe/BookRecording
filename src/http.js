import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import router from './router/index'

let loading;
const startLoading = () => {
    loading = ElLoading.service({
        lock: true,
        text: "正在加载中...",
        background: "rgba(0, 0, 0, .7)"
    })
}

const endLoading = () => {
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading()

    if (localStorage.bookRecordtoken) {
        // 设置统一的请求头 header
        config.headers.Authorization = localStorage.bookRecordtoken
    }

    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading()
    return response
}, error => {
    // 错误提醒
    endLoading()
    ElMessage.error(error.response.data)

    // 获取错误状态码
    const { status } = error.response
    if (status == 401) {
        ElMessage.error("token失效，请重新登录")
        // 清除token
        localStorage.removeItem('bookRecordToken')
        // 重新跳转登录页面
        router.push("/login")
    }
    return Promise.reject(error)
})

export default axios