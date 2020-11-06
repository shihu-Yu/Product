const express = require('express')
const Category = require('../models/category')
const router = express.Router()
//获取共通数据

const getCommonData = async()=>{
    const categoriesPromise = Category.find({},"name")
    const categories = await categoriesPromise
    return{
        categories
    }
}

//显示首页
router.get('/',async(req,res)=>{
    const {categories} = await getCommonData()
    res.render('main/index',{
        userInfo:req.userInfo,
        categories
    })
    
})
//显示列表页面
router.get('/list/:id',async(req,res)=>{
    const { id } = req.body
    const {categories} = await getCommonData()
    res.render('main/list',{
        userInfo:req.userInfo,
        categories,
        currentCategory:id
    })
    
})

module.exports = router
