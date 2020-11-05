//处理用户模型
const mongoose = require('mongoose')

//定义注册用户模型
const articleSchema = new mongoose.Schema({
    // 标题
    title:{
        type:String,
        required:true,
    },
    // 简介
    intro:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default:''
    },
    usr:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    click:{
        type:Number,
        default:0
    }
    
})

const Article = mongoose.model('article',articleSchema)

module.exports = Article