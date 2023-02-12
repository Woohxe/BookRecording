const express = require('express')
const router = express.Router()

const bookHandler = require('../router_handler/book_handler')


// 新增
router.post('/add', bookHandler.bookAdd)
// 查询全部数据
router.get('/bookAll', bookHandler.bookAll)
// 编辑
router.post('/edit/:id', bookHandler.bookEdit)
// 删除
router.post('/delete/:id', bookHandler.bookDelete)

module.exports = router


