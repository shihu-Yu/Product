const express = require('express')
const swig = require('swig')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Cookies = require('cookies')

const app = express()

mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',()=>{
    throw new Error('DB error')
})

db.once('open',()=>{
    console.log('DB connected')
})


app.use(express.static('public'))

//解析json 
app.use(bodyParser.json())
//解析urlencoded内容
app.use(bodyParser.urlencoded({extended:false}))


//设置模板引擎
swig.setDefaults({
    // cache: 'memory',//如果需要缓存需要添加
    cache: false
})
app.engine('html', swig.renderFile);
app.set('views', './views')
app.set('view engine', 'html')

//设置cookie的中间件
app.use((req,res,next)=>{
    //把cookie对象保存到req对象上
    req.cookies = new Cookies(req,res)
    //从用户的请求中获取cookie
    const userInfo = JSON.parse(req.cookies.get('userInfo') || "{}")
    req.userInfo = userInfo
    next()
})


//路由模块化 分离开来 路由入口
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))



app.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000')
})