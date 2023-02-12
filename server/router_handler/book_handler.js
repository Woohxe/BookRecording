// const db = require('../db/index')

// // 书籍添加
// exports.bookAdd = (req, res) => {
//     const bookInfo = req.body

//     const sql = `insert into books set ?`
//     db.query(sql, bookInfo, (err, results) => {
//         if (err) {
//             return res.send({
//                 status: 404,
//                 message: err.message
//             })
//         }

//         if (results.affectedRows !== 1) {
//             return res.status(400).json('请重试')
//         }

//         res.json({
//             status: 200,
//             message: '添加成功'
//         })

//     })
// }

// // 查询所有书籍
// exports.bookAll = (req, res) => {
//     const sql = `select * from books order by bookId desc`
//     db.query(sql, (err, results) => {
//         if (err) return res.status(400).json(err)
//         if (results.length === 0) return res.status(200).json('查无数据')
//         res.json(results)
//     })
// }

const db = require('../db/index')

exports.bookAdd = (req, res) => {
    const fields = req.body

    const sql = `insert into books set ?`
    db.query(sql, fields, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('添加失败')
        res.json(fields)
    })
}

exports.bookAll = (req, res) => {
    const sql = `select * from books order by bookId asc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('查无数据')
        res.json(results)
    })
}

exports.bookEdit = (req, res) => {
    const fields = req.body

    const sql = `update books set ? where bookId = ?`
    db.query(sql, [fields, req.params.id], (err, results) => {
        console.log(req.params.id)
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(fields)
    })
}

exports.bookDelete = (req, res) => {
    const sql = `delete from books where bookId = ?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}