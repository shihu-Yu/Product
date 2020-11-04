// routes admins/admins
const express = require('express')
const router = express.Router()

const User = require('../models/user')

//获取分页共同函数
const pagination = require('../utils/pagination')

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
    const userCount = await User.estimatedDocumentCount()
    //处理登陆逻辑
    res.render('admin/index',{
        userInfo:req.userInfo,
        userCount:userCount
    }) 
})

//渲染用户列表
router.get('/users',async(req,res)=>{
    const options = {
        page:req.query.page,
        model:User,
        projection:"-_v -password"
    }
    
    const result = await pagination(options)
    
    res.render('admin/user_list',{
        userInfo:req.userInfo,
        users:result.docus,
        list:result.list,
        pages:result.pages,
        page:result.page,
        url:'/admins/users'
    })
})

module.exports = router