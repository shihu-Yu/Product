const express = require('express')
const router = express.Router()
const User = require('../models/user')

const hmac = require('../utils/hmac')
//注册
router.post('/register',async (req,res)=>{
    const {username, password}= req.body
    try{
            //判断用户是否存在
        const user = await User.findOne({username:username})
        if(user){
            return res.json({
                code:1,
                message:'用户已经存在'
            })
        }
        //用户不存在就插入数据库
        await User.insertMany({
            username:username,
            password:hmac(password),
            // isAdmin:true //仅仅在生成管理员时使用
        })
        res.json({
            code:0,
            message:'注册成功'
        })
    }catch(e){
        res.json({
            code:1,
            message:'注册失败，服务器端错误'
        })
    }
   
})


module.exports = router