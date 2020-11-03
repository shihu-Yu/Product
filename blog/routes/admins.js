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
    const userCount = await User.estimatedDocumentCount()
    //处理登陆逻辑
    res.render('admin/index',{
        userInfo:req.userInfo,
        userCount:userCount
    }) 
})

//渲染用户列表
router.get('/users',async(req,res)=>{

    let page = parseInt(req.query.page) 
    if(isNaN(page)){
        page = 1
    }else if(page<0){
        page = 1
    }
    //根据请求的页码计算需要显示的数据
    /*
    假设总共有六条数据
    page = 1 需要显示1,2条数据 limit(2)
    page = 2 需要显示3 4条数据 limit(2) skip(2)
    page = 3 需要显示5 6条数据 limit(2) skip(4)
    每页显示两条数据

    skip((page - 1)*limit)
    */
    const limit = 2
    const skip = (page - 1)*limit
    //计算总页数
    const userCount = await User.estimatedDocumentCount()
    const totoalPages = Math.ceil(userCount / limit)
    const pages = []
    for(let i = 1;i<=totoalPages;i++){
        pages.push(i)
    }
    //获取数据
    const users = await User.find({},"-password -_v").sort({_id:-1}).skip(skip).limit(limit)
    res.render('admin/user_list',{
        userInfo:req.userInfo,
        list:users,
        pages:pages,
        page:page
    })
})

module.exports = router