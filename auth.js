// 中间件--进入路由之前要求用户未登录,如果未登录的话可继续访问路由,如果已登录,则跳回首页,提示已经登录
exports.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        res.redirect('back')
    } else {
        next()
    }
}
//要求此路由登录后才能访问 未登录跳回登录页面
exports.checkLogin = function (req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/user/signin')
    }
}