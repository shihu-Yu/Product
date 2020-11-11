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
articleSchema.statics.findPagetionArticles = async function(req,query){
    const options = {
        page:req.query.page,
        projection:"-__v",
        sort:{order:1},
        model:this,
        query:query,
        populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
    }
    const result = await pagination(options)
    // 格式化时间
    const docs = result.docs.map(item =>{
        const obj = JSON.parse(JSON.stringify(item))
        obj.createdTime = moment(this.createAt).format('YYYY-MM-DD HH:mm:ss')
        return obj
    })
    result.docs = docs
    return result
}

//定义虚拟字段
articleSchema.virtual('createdTime').get(function(){
    // return new Date(this.createAt).toLocaleString()
    return moment(this.createAt).format('YYYY-MM-DD HH:mm:ss')
})


const Article = mongoose.model('article',articleSchema)

module.exports = Article