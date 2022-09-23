let express = require('express')
let { Article } = require('../module')
//调用router 方法可以得到一个路由中间件实例
let router = express.Router()
//当客户端通过GET请求访问/路径的时候,会交由对应的函数来处理
router.get('/', function (req, res) {
    let { keyword, pageNum = 1, pagesize = 3 } = req.query
    let query = {}
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum)
    pagesize = isNaN(pagesize) ? 3 : parseInt(pagesize)
    if (keyword) {
        // query.title = new RegExp(keyword);// /b/
        query['$or'] = [
            { title: new RegExp(keyword) },
            { content: new RegExp(keyword) },
        ]
    }
    //populate 可以把一个字段从字符串转成对象
    Article.count(query, function (err, count) {//总条数
        if (err) {
            req.flash('error', err)
        } else {
            Article.find(query).sort({ createAt: -1 }).skip((pageNum - 1) * pagesize).limit(pagesize).populate('user').exec(function (err, articles) {
                if (err) {
                    req.flash('error', '操作数据库失败')
                } else {
                    if (articles) {
                        //路由是相对路径, 相对于模板的根目录
                        let param = {
                            title: '首页', articles, keyword, count, pagesize, pageNum, totalPages: Math.ceil((count / pagesize))
                        }
                        res.render('index.html', param)
                    } else {
                        req.flash('error', '未查询到相关文章')
                    }
                }
            })
        }
    })
})
module.exports = router
