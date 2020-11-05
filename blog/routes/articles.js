// routes admins/article
const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({dest:'public/uploads/'})

const Article = require('../models/article')
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

//显示文章列表
router.get('/',async(req,res)=>{
    const options = {
        page:req.query.page,
        projection:"-_v",
        sort:{order:1},
        model:Article
    }
    
    const result = await pagination(options)
    
    res.render('admin/article_list', {
        userInfo: req.userInfo,
        articles: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/articles'
    })
})


//渲染添加文章页面
router.get('/add',async(req,res)=>{
    const categories = await Category.find({},'-__v -order').sort({order:1})
    res.render('admin/article_add',{
        userInfo: req.userInfo,
        categories
    })
})
//
router.post('/uploadImage',upload.single('upload'),async(req,res)=>{
    const filename = "/uploads/" + req.file.filename
    res.json({
        uploaded:true,
        url:filename
    })
})
//处理新增文档
router.post('/add',async(req,res)=>{
    const {title,category,intro,content} = req.body
    const user = req.userInfo._id
    try{
        await Article.insertMany({
            title,
            category,
            intro,
            content,
            user
        })
        console.log()
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'添加文章成功',
            nextUrl:'/articles'
        })
    }catch(e){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'服务器端错误',
            nextUrl:'/articles'
        })
    }
})

module.exports = router