//处理用户模型
const mongoose = require('mongoose')

//定义注册用户模型
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        maxlength:6
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('user',userSchema)

module.exports = User