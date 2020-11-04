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
        sort:{order:1},
        model:Category,
        projection:"-_v"
    }
    
    const result = await pagination(options)
    
    res.render('admin/category_list', {
        userInfo: req.userInfo,
        categories: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/categories'
    })
})

//添加分类
router.get('/add',async(req,res)=>{
    res.render('admin/category_add_edit',{
        userInfo: req.userInfo
    })
})
//处理添加分类
router.post('/add',async(req,res)=>{
    let {name,order} = req.body
    
    if(!order){
        order = 0
    }
    try{
        //判断是否有同名的分类
        const category = await Category.findOne({name})
        if(category){
            //返回一个错误界面
            res.render('admin/error',{
                userInfo: req.userInfo,
                message:'已经有了同名的分类',
                nextUrl:'/categories'
            })
        }
        else{
            //如果没有同名分类就进行插入
            await Category.insertMany({name,order})
            //返回一个成功界面
            res.render('admin/success',{
                userInfo: req.userInfo,
                message:'添加分类成功',
                nextUrl:'/categories'
            })
        }

    }catch(e){
        //返回一个错误界面
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'服务器端错误',
            nextUrl:'/categories'
        })
    }
})

router.get('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const category = await Category.findOne({_id:id},'-_v')
    res.render('admin/category_add_edit',{
        userInfo: req.userInfo,
        category
    })
})
//处理编辑操作
router.post('/edit',async(req,res)=>{
    const {name,order,id} = req.body
    try{
        //判断是否有更新
        const category1 = await Category.findOne({_id:id},'-_v')
        if(category1.name == name && category1.order == order){
            return res.render('admin/error',{
                userInfo: req.userInfo,
                message:'请修改内容再提交',
                nextUrl:'/categories'
            })
        }
        //判断更新后的数据是否存在
        const category2 = await Category.findOne({name:name,_id:{$ne:id}},'-_v')
        if(category2){
            return res.render('admin/error',{
                userInfo: req.userInfo,
                message:'该分类名称已经存在',
                nextUrl:'/categories'
            })

        }
        //更新(当程序走到这里时证明已经修改过内容且修改内容在数据库中不存在)
        await Category.updateOne({_id:id},{name,order})
        return res.render('admin/success',{
            userInfo:req.userInfo,
            message:'修改分类成功',
            nextUrl:'/categories'
        })
    }catch(e){
        return res.render('admin/error',{
            userInfo: req.userInfo,
            message:'服务器端错误',
            nextUrl:'/categories'
        })
    }
})

router.post('del',(req,res)=>{

})
module.exports = router