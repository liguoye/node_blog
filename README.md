# 新建一个项目
```
npm init  -y
```
cnpm install async body-parser  bootstrap  connect-flash  connect-mongo  cookie-parser  debug  ejs  express  express-session  jquery  mongoose  morgan  multer  serve-favicon --save
```
- --save-dev  = -D
- --save = -S

- git init 
- git add -A
- git commit -m "1.初始化项目和依赖的模块"
```

# 创建服务
- express+mongoose
```
let express = require('express')
let app = express()
app.listen(8080)
```