let mongoose = require('mongoose')
// mongoose.Promise = Promise
//连接数据库
mongoose.connect('mongodb://127.0.0.1/node_pro')
//定义用户集合的骨架模型,规定了用户集合中文档的属性和类型
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String,
})
//定义用户模型
let User = mongoose.model('User', UserSchema)
//把用户模型挂载导出对象上
exports.User = User

let ObjectId = mongoose.Schema.Types.ObjectId
//发表文章
let articleSchema = new mongoose.Schema({
    title: String,
    content: { type: String },
    createAt: { type: Date, default: Date.now },
    //User 是一个外链,引用的是另一个集合的主键
    user: { type: ObjectId, ref: 'User' },//引用的是用户表的_id
})
let Article = mongoose.model('Article', articleSchema)
exports.Article = Article