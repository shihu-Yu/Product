const express = require('express')
const Category = require('../models/category')
const Article = require('../models/article')
const router = express.Router()
//获取共通数据

const getCommonData = async()=>{
    const categoriesPromise = Category.find({},"name")
    const topArticlesPromise = Article.find({},"title click").sort({click:-1}).limit(10)
    const categories = await categoriesPromise
    const topArticles = await topArticlesPromise
    return{
        categories,
        topArticles
    }
}

//显示首页
router.get('/',async(req,res)=>{
    const {categories, topArticles} = await getCommonData()
    const result = await Article.findPagetionArticles(req)
    res.render('main/index',{
        userInfo:req.userInfo,
        categories,
        topArticles,
        articles: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page
    })
    
})
//显示列表页面
router.get('/list/:id',async(req,res)=>{
    const { id } = req.params
    const {categories,topArticles} = await getCommonData()
    res.render('main/list',{
        userInfo:req.userInfo,
        categories,
        currentCategory:id,
        topArticles
    })
    
})

module.exports = router
