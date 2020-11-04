//处理用户模型
const mongoose = require('mongoose')

//定义注册用户模型
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    order:{
        type:Number,
        default:0
    }
})

const Category = mongoose.model('category',categorySchema)

module.exports = Category