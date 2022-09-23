let express = require('express')

let multer = require('multer')
let uploads = multer({ dest: './public/uploads' })//指定上传文件的存放路径
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
    req.flash('success', '退出成功')
    res.redirect('/user/signin')

})
//用户登录
router.post('/signin', checkNotLogin, function (req, res) {
    let user = req.body //得到用户提交登录表单
    //查询数据库中符合条件的一条数据
    User.findOne(user, function (err, doc) {
        if (err) {
            req.flash('error', '操作数据库失败')
            res.redirect('back')
        } else {
            if (doc) {
                req.flash('success', '登录成功')
                //向回话对象中写入属性 user=doc
                req.session.user = doc
                res.redirect('/')
            } else {
                req.flash('error', '用户名或者密码不正确')
                res.redirect('back')
            }
        }
    })
})
/**req.file
 *  
{ fieldname: 'avatar', //上传字段名
  originalname: '11psu.jpg', //上传文件名
  encoding: '7bit', //编码
  mimetype: 'image/jpeg', //文件类型
  destination: './public/uploads', //服务器上存放路径
  filename: '887e10e0eb841944693330496aa6d972', //在服务器保存的文件名
  path: 'public\\uploads\\887e10e0eb841944693330496aa6d972', //
  size: 59511 //文件大小
}

  req.body
  {
     username: '1234',
     password: '1234',
     email: '871754259@qq.com'
  }
 * **/
//single 当表单里只有一个上传字段的话 avatar是上传文件字段的name属性 req.file req.body
router.post('/signup', checkNotLogin, uploads.single('avatar'), function (req, res) {
    console.log('req', req.file, req.body)
    let user = req.body //请求体对象 username password email
    user.avatar = `/uploads/${req.file.filename}`
    User.create(user, function (err, doc) {//_id  
        if (err) {
            req.flash('error', '注册失败')
            res.redirect('back')
        } else {
            req.flash('success', '注册成功')
            res.redirect('/user/signin')
        }
    })
})
module.exports = router