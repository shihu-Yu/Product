// routes admins/admins
const express = require('express')
const router = express.Router()

const User = require('../models/user')

//权限验证
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
       return res.send('<h1>请使用管理员账号登陆</h1>')
    }
})

//显示管理员后台首页
router.get('/',async (req,res)=>{
    const userCount = User.estimatedDocumentCount()
    //处理登陆逻辑
    res.render('admin/index',{
        userInfo:req.userInfo,
        userCount:req.userCount
    })
    
})


module.exports = router