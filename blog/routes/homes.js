// routes admins/categary
const express = require('express')
const router = express.Router()

//获取分页共同函数
const Comment = require('../models/comment')
const User = require('../models/user')
const hmac = require('../utils/hmac')
const pagination = require('../utils/pagination')

//权限的验证
router.use((req, res, next) => {
    if (req.userInfo._id) {
        next()
    } else {
        return res.send('<h1>请登录</h1>')
    }
})
//显示普通用户个人中心后台首页
router.get('/',async (req,res)=>{
    //处理登陆逻辑
    res.render('home/index',{
        userInfo:req.userInfo,
    }) 
})
//渲染评论管理
router.get('/comments',async(req,res)=>{
    const result = await Comment.findPaginationComments(req,{user:req.userInfo._id})
    res.render('home/comment_list', {
        userInfo: req.userInfo,
        comments: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/homes/comments'
    })
})
// 删除评论
router.get('/comments/delete/:id',async (req,res)=>{
    const { id } = req.params
    try{
        // 这里删除评论时 一定要传入user这个参数 用来判断当前删除的评论发布者是否和当前登陆的用户是一致的
        const result = await Comment.deleteOne({_id:id,user:req.userInfo._id})
        if(result.deletedCount == 0){
            res.render('home/error',{
                userInfo:req.userInfo,
                message:'你不能删除该评论',
                nextUrl:'/homes/comments'
            })
        }else{
            res.render('home/success',{
                userInfo:req.userInfo,
                message:'删除评论成功',
                nextUrl:'/homes/comments'
            })
        } 
    }catch(e){
        res.render('home/error',{
            userInfo:req.userInfo,
            message:'服务器端错误',
            nextUrl:'/homes/comments'
        })
    }
})

// 渲染修改密码界面

//显示修改密码界面
router.get('/password',async(req,res)=>{
    res.render('home/password',{
        userInfo:req.userInfo,
        url:'/homes/password'
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
        res.render('home/success',{
            userInfo:req.userInfo,
            message:'修改密码成功',
            nextUrl:'/'
        })
    }catch(e){
        res.render('home/error',{
            userInfo:req.userInfo,
            message:'服务器端错误',
            nextUrl:'/homes/password'
        })
    }
})


module.exports = router