let express = require('express')
let router = express.Router()
let { User } = require('../module')
let { checkLogin, checkNotLogin } = require('../auth')
/***
 * 
 * 注册功能如何实现
 * 绘制注册页面模板
 * 实现提交用户的注册路由 post/user/signup
 * 在路由中获得请求体
 * 
 * ***/
router.get('/signup', checkNotLogin, function (req, res) {
    //路由是相对路径, 相对于模板的根目录
    res.render('user/signup.html', {
        title: '注册'
    })
})
router.get('/signin', checkNotLogin, function (req, res) {
    //路由是相对路径, 相对于模板的根目录
    res.render('user/signin.html', {
        title: '登录'
    })
})
router.get('/signout', checkLogin, function (req, res) {
    req.session.user = null
    res.redirect('/user/signin')

})
//用户登录
router.post('/signin', checkNotLogin, function (req, res) {
    let user = req.body //得到用户提交登录表单
    //查询数据库中符合条件的一条数据
    User.findOne(user, function (err, doc) {
        if (err) {
            res.redirect('back')
        } else {
            if (doc) {
                //向回话对象中写入属性 user=doc
                req.session.user = doc
                res.redirect('/')
            } else {
                res.redirect('back')
            }
        }
    })
})
router.post('/signup', checkNotLogin, function (req, res) {
    let user = req.body //请求体对象 username password email
    User.create(user, function (err, doc) {//_id  
        if (err) {
            res.redirect('back')
        } else {
            res.redirect('/user/signin')
        }
    })
})
module.exports = router