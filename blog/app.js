const express = require('express')
const swig = require('swig')

const mongoose = require('mongoose')
const bodyparse = require('body-parse')
const app = express()
const db = mongoose.connect()

mongoose.connect('http://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true})

db.on('error',()=>{
    throw new Error('DB error')
})

db.once('open',()=>{
    console.log('DB connected')
})


app.use(express.static('public'))
swig.setDefaults({
    // cache: 'memory',//如果需要缓存需要添加
    cache: false
})
app.engine('html', swig.renderFile);
app.set('views', './views')
app.set('view engine', 'html')

//路由模块化 分离开来
app.use('/',require('./routes/index'))



app.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000')
})