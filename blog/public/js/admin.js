;(function($){
    $('.del').on('click',function(){
        if(!window.confirm('您确定要删除吗')){
            return false  //当点击取消时 阻止默认行为 不在发送请求
        }
    })
})(jQuery)