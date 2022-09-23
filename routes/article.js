let express = require('express')
let router = express.Router()
let { checkLogin } = require('../auth')
router.get('/add', checkLogin, function (req, res) {
    //路由是相对路径, 相对于模板的根目录
    res.render('article/add.html', {
        title: '发表文章'
    })
})

module.exports = router