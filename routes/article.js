let express = require('express')
let router = express.Router()
let { checkLogin } = require('../auth')
let { Article } = require('../module/index')
router.get('/add', checkLogin, function (req, res) {
    //路由是相对路径, 相对于模板的根目录
    res.render('article/add.html', { title: '发表文章', article: {} })
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

router.get('/detail/:_id', checkLogin, function (req, res) {
    let _id = req.params._id//获取路径参数 _id
    Article.findById(_id, function (err, article) {
        if (err) {
            req.flash('error', err)
            res.redirect('back')
        } else {
            res.render('article/detail', { title: '文章详情', article })
        }
    })

})
router.get('/delete/:_id', function (req, res) {
    let _id = req.params._id
    Article.remove({ _id }, function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('back')
        } else {
            req.flash('success', '删除文章成功')
            res.redirect('/')
        }
    })
})
//更新文章 复用add.html
router.get('/update/:_id', function (req, res) {
    let _id = req.params._id
    Article.findById(_id, function (err, article) {
        if (err) {
            req.flash('error', err)
            res.redirect('back')
        } else {
            res.render('article/add', { title: '更新文章', article })
        }
    })
})
router.post('/update/:_id', function (req, res) {
    let _id = req.params._id
    let body = req.body
    Article.updateOne({ _id }, body, function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('back')
        } else {
            req.flash('success', '文章更新成功')
            res.redirect('/article/detail/' + _id)
        }
    })
})
module.exports = router