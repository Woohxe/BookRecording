const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

// 登录注册相关路由
const adminRouter = require('./router/admin')
app.use('/api/admin', adminRouter)

//书籍查询增加相关路由
const bookRouter = require('./router/book')
app.use('/api/book', bookRouter)

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3000, () => {
    console.log(`api server running at http://127.0.0.1:3000`)
})