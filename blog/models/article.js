//处理用户模型
const mongoose = require('mongoose')
const pagination = require('../utils/pagination')
const moment = require('moment')

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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
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

//静态方法
articleSchema.statics.findPagetionArticles = function(req,query){
    const options = {
        page:req.query.page,
        projection:"-__v",
        sort:{order:1},
        model:this,
        query:query,
        populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
    }
    return pagination(options)

}

//定义虚拟字段
articleSchema.virtual('createdTime').get(function(){
    // return new Date(this.createAt).toLocaleString()
    return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})


const Article = mongoose.model('article',articleSchema)

module.exports = Article