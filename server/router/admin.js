const express = require('express')
const router = express.Router()

const adminHandler = require('../router_handler/admin_handler')

// 注册
router.post('/register', adminHandler.register)

// 登录
router.post('/login', adminHandler.login)

module.exports = router
