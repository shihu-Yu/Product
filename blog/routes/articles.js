// routes admins/article
const { query } = require('express')
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
    
    //调用静态方法
    const result = await Article.findPagetionArticles(req)
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
    res.render('admin/article_add_edit',{
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

//显示编辑页面
router.get('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const categoriesPromise =  Category.find({},"-__v -order").sort({_id:1})
    const articlePromise =  Article.findOne({_id:id},"title category intro content")

    const categories = await categoriesPromise
    const article = await articlePromise
    res.render('admin/article_add_edit',{
        userInfo: req.userInfo,
        categories,
        article
    })
})

//处理编辑操作
router.post('/edit',async(req,res)=>{
    const {title,category,intro,content,id} = req.body
    try{
        //更新
        await Article.updateOne({_id:id},{title,category,intro,content})
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'编辑文章成功',
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

//处理删除操作
router.get('/delete/:id',async (req,res)=>{
    const { id } = req.params
    try{
        await Article.deleteOne({_id:id})
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除文章成功',
            nextUrl:'/articles'
        })
    }catch(e){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'服务器端错误',
            nextUrl:'/articles'
        })
    }
})

module.exports = router