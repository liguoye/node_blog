let express = require('express')
//调用router 方法可以得到一个路由中间件实例
let router = express.Router()
//当客户端通过GET请求访问/路径的时候,会交由对应的函数来处理
router.get('/', function (req, res) {
    //路由是相对路径, 相对于模板的根目录
    res.render('index.html', {
        title: '首页'
    })
})
module.exports = router
