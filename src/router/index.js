import { createRouter, createWebHistory } from "vue-router";
import AdminIndex from '@/views/admin/AdminIndex.vue'
import Home from '@/views/home/Home.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        component: AdminIndex,
        redirect: '/login',
        children: [
            {
                path: "/register",
                component: () => import("@/views/admin/components/Register.vue")
            },
            {
                path: "/login",
                component: () => import("@/views/admin/components/Login.vue")
            },
        ]
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: "/bookList",
                name: "bookList",
                component: () => import("@/views/bookList/BookList.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.bookRecordToken ? true : false
  
    if (to.path == "/login" || to.path == '/register') {
        next()
    } 
    else {
        isLogin ? next() : next("/login")
    }
  })
  

export default router