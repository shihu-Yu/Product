;(function($){
     //密码的正则表达式 密码只能是英文字母开头 长度为3至7位
     var $passwordReg = /^\w{3,6}$/
    $('#btn-reg-pwd').on('click',function(){
        var inputPassword = $('#password').val()   
        var inputRepPassword = $('#repassword').val()
        var $err = $('.text-danger')
        if(!$passwordReg.test(inputPassword)){
            $err.eq(0).html('密码格式错误 密码只能是英文字母开头 长度为3至7位')
            return false 
        }else{
            $err.eq(0).html('')
        } 
        if(inputPassword != inputRepPassword){
            $err.eq(1).html('两次输入的密码不一样')
            return false 
        }else{
            $err.eq(1).html('')
        } 
    })
})(jQuery)