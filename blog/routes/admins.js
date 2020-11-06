// routes admins/admins
const express = require('express')
const Article = require('../models/article')
const Category = require('../models/category')
const router = express.Router()

const User = require('../models/user')
const hmac = require('../utils/hmac')

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
    const articleCount = await Article.estimatedDocumentCount()
    const categoryCount = await Category.estimatedDocumentCount()
    //处理登陆逻辑
    res.render('admin/index',{
        userInfo:req.userInfo,
        userCount,
        categoryCount,
        articleCount
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
        users:result.docs,
        list:result.list,
        pages:result.pages,
        page:result.page,
        url:'/admins/users'
    })
})

//显示修改密码界面
router.get('/password',async(req,res)=>{
    res.render('admin/password',{
        userInfo:req.userInfo,
        url:'/admins/password'
    })
})

//处理修改密码
router.post('/password',async(req,res)=>{
    const {password} = req.body
    try{
        //更新密码
        await User.updateOne({_id:req.userInfo._id},{password:hmac(password)})
        //退出登录
        req.session.destroy()
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'修改密码成功',
            nextUrl:'/'
        })
    }catch(e){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'服务器端错误',
            nextUrl:'/admins/password'
        })
    }
})


module.exports = router