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

//登陆逻辑
router.post('/login',async (req,res)=>{
    const {username, password}= req.body
    try{
        //查询用户名和密码是否存在
        const user = await User.findOne({username:username,password:hmac(password)},"-password -__v")//这里查询密码时要加密传入，否则会查询失败
        if(user){
            //用Cookies的对象来设置cookie,Cookies的对象在app.js中用中间件保存的
            // req.cookies.set('userInfo',JSON.stringify(user))
            
            //设置session
            req.session.userInfo = user
            return res.json({
                code:0,
                message:'登陆成功'
            })
        }else{
           return res.json({
                code:1,
                message:'登陆失败,用户名或密码错误'
            })
        }
    }catch(e){
        res.json({
            code:1,
            message:'服务器端错误'
        })
    }  
})

//退出逻辑
router.get('/logout',async (req,res)=>{
    //销毁session
    req.session.destroy()
    return res.json({
        code:0,
        message:'用户退出成功'
    })
})


module.exports = router