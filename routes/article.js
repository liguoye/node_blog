let express = require('express')
let router = express.Router()
router.get('/add', function (req, res) {
    res.send('发表文档')
})
router.get('/delete', function (req, res) {
    res.send('删除文章')
})

module.exports = router