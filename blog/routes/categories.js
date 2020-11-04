// routes admins/categary
const express = require('express')
const router = express.Router()

const Category = require('../models/category')

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

//渲染分类列表
router.get('/',async(req,res)=>{
    const options = {
        page:req.query.page,
        model:Category,
        projection:"-_v"
    }
    
    const result = await pagination(options)
    
    res.render('admin/category_list',{
        userInfo: req.userInfo,
        categories: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/categories'
    })
})

module.exports = router