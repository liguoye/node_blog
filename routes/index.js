let express = require('express')
let { Article } = require('../module')
//调用router 方法可以得到一个路由中间件实例
let router = express.Router()
//当客户端通过GET请求访问/路径的时候,会交由对应的函数来处理
router.get('/', function (req, res) {
    //populate 可以把一个字段从字符串转成对象
    Article.find().populate('user').exec(function (err, articles) {
        console.log('aarjlkdsjf', articles)
        if (err) {
            req.flash('error', '操作数据库失败')
        } else {
            if (articles) {
                //路由是相对路径, 相对于模板的根目录
                res.render('index.html', { title: '首页', articles })
            } else {
                req.flash('error', '未查询到相关文章')
            }
        }
    })
})
module.exports = router
