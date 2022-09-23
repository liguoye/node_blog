let express = require('express')
let router = express.Router()
let { checkLogin } = require('../auth')
let { Article } = require('../module/index')
router.get('/add', checkLogin, function (req, res) {
    //路由是相对路径, 相对于模板的根目录
    res.render('article/add.html', {
        title: '发表文章'
    })
})
router.post('/add', checkLogin, function (req, res) {
    let article = req.body
    article.user = req.session.user._id
    Article.create(article, function (err, doc) {
        if (err) {
            req.flash('error', err)
            res.redirect('back')
        } else {
            req.flash('success', '文章发表成功')
            res.redirect('/')
        }
    })
})
module.exports = router