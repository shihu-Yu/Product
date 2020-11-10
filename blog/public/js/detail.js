;(function($){
    // 提交评论内容
    $('#btn-sub-comment').on('click',function(){
        //获取评论内容
        var commentVal = $('#comment-textarea').val()
        commentVal = commentVal.trim()
        //限制评论输入
        var errMsg = ''
        if(commentVal == ''){
            errMsg = '评论不能为空'
        }else if(commentVal.length>100){
            errMsg = '评论内容不能超过一百个字符'
        }else{
            errMsg = ''
        }
        if(errMsg){
            $('.text-danger').html(errMsg)
            return false
        }else{
            $('.text-danger').html('')
        }
        //获取文章id
        var id = $(this).data('id')
        $.ajax({
            type:'POST',
            url:'/comments',
            data:{
                content:commentVal,
                article:id
            },
            success:function(result){
                if(result.code == 0){
                    $('#comment-textarea').val('')
                    $('#comment-page').trigger('get-data', result.data)
                }
            }

        })

    })
})(jQuery)