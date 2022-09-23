let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let app = express()
//解析客户端提交过来的请求体  并转成程序赋给req.body
app.use(bodyParser.urlencoded({ extended: true }))
//设置模板引擎 html
app.set('view engine', 'html')
//指定模板的存放根目录
app.set('views', path.resolve('views'))
app.engine('html', require('ejs').__express)
//设置静态文件目录
app.use(express.static(path.resolve('node_modules')))
app.use(express.static(path.resolve('public')))

//写在路由前面  在使用了此回话中间件之后,会在请求对象上增加req session属性
let session = require('express-session')
app.use(session({
    resave: true,//每次客户端请求服务器都会报错session 
    secret: 'zfpx',//用来加密cookie
    saveUninitialized: true,//保存未初始化的session
    cookie: {
        maxAge: 3600 * 1000,//指定cookie的过期时间
    },
}))

//消息提示中间件  flash-闪光一闪而过  
// 此中间件要放在session后面 依赖以session req.flash(type,msg) req.flash(type) 赋值-取值
// 读完数据后 立即销毁数据  没有缓存
let flash = require('connect-flash')
app.use(flash())
app.use(function (req, res, next) {
    //真正渲染模板的是res.locals
    res.locals.user = req.session.user
    res.locals.success = req.flash('success').toString()
    res.locals.error = req.flash('error').toString()
    next()
})
let index = require('./routes/index.js')
let user = require('./routes/user.js')
let article = require('./routes/article.js')
app.use('/', index)
app.use('/user', user)
app.use('/article', article)
app.listen(8080)
// let serve =require('http').createServer(app)
// serve.listen(8080)