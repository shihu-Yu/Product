//退出登录

;(function($){
    $('#logout').on('click',function(){
        $.ajax({
            url:'/users/logout',
            type:'GET',
            dataType:'json',
            success:function(result){
                if(result.code == 0){
                    //刷新当前页面
                    window.location = "/"
                }
            }
        })
    })


})(jQuery)