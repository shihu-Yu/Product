const express = require('express')
const swig = require('swig')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

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

//路由模块化 分离开来
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))



app.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000')
})