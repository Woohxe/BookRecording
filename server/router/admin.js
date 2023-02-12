const express = require('express')
const router = express.Router()

const adminHandler = require('../router_handler/admin_handler')

// 注册
router.post('/register', adminHandler.register)

// 登录
router.post('/login', adminHandler.login)

// 查询所有书
router.get('/bookAll', adminHandler.bookAll)

module.exports = router
