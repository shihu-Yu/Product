// routes admins/categary
const express = require('express')
const router = express.Router()

//获取分页共同函数
const Comment = require('../models/comment')
const pagination = require('../utils/pagination')

//权限的验证
router.use((req, res, next) => {
    if (req.userInfo._id) {
        next()
    } else {
        return res.send('<h1>请登录</h1>')
    }
})

//添加评论
router.post('/',async(req,res)=>{
    const {content,article} = req.body
    const user = req.userInfo._id
    try{
        await Comment.insertMany({
            content,
            user,
            article
        })
        //获取最新评论
        const result = await Comment.findPaginationComments(req,{article:article})
        res.json({
            code:0,
            message:'添加评论成功',
            data:result
        })

    }catch(e){
        res.json({
            code:1,
            message:'添加评论失败',
        })
    }
})
    
    

module.exports = router