;(function($){
    var $registerWrap = $('#register-wrap')
    var $loginWrap = $('#login-wrap')

    //切换到注册面板
    $('#goto-register').on('click',function(){
        // 显示注册面板
        $registerWrap.show()
        // 隐藏登陆面板
        $loginWrap.hide()
    })

    //切换到登陆面板
    $('#goto-login').on('click',function(){
        // 显示登陆面板
        $loginWrap.show()
        //隐藏注册面板
        $registerWrap.hide()
    })

    //处理注册交互逻辑
    //定义公用的这则表达式
    //用户名的正则表达式 用户名只能以下划线、英文字母和数字开头 长度为3至6位
    var  $usernameReg = /^[a-z][a-z1-9_]{2,5}$/
    //密码的正则表达式 密码只能是英文字母开头 长度为3至7位
    var $passwordReg = /^\w{3,6}$/

    $('#sub-register').on('click',function(){
        //获取注册页面输入框的内容
        var inputUsername = $('#regInputUsername').val()   
        var inputPassword = $('#regInputPassword').val()   
        var inputRepPassword = $('#regInputRepPassword').val()
        var $err = $registerWrap.find('.text-danger')
        //验证注册时的用户名以及密码
        var errMsg = ''
        if(!$usernameReg.test(inputUsername)){
            errMsg = '用户名只能以下划线、英文字母和数字开头，长度为3至6位'
        }else if(!$passwordReg.test(inputPassword)){
            errMsg = '密码格式错误 密码只能是英文字母开头 长度为3至7位'
        }else if(inputPassword != inputRepPassword){
            errMsg = '两次输入的密码不一样'
        }
        if(errMsg){
            $err.html(errMsg)
            return false
        }
        $err.html('')
        $.ajax({
            url:'/users/register',
            type:'POST',
            dataType:'json',
            data:{
                username:inputUsername,
                password:inputPassword
            },
            success:function(result){
                if(result.code == 0){
                    $('#goto-login').trigger('click')
                }else{
                    $err.html(result.message)
                }
            },
            error:function(){
                $err.html('服务器端错误')
            }
        })
        
    })

    //登陆逻辑的处理
    $('#sub-login').on('click',function(){
        //获取注册页面输入框的内容
        var inputUsername = $('#loginInputUsername').val()   
        var inputPassword = $('#loginInputPassword').val()   
        var $err =  $loginWrap.find('.text-danger')
        //验证注册时的用户名以及密码
        var errMsg = ''
        if(!$usernameReg.test(inputUsername)){
            errMsg = '用户名只能以下划线、英文字母和数字开头，长度为3至6位'
        }else if(!$passwordReg.test(inputPassword)){
            errMsg = '密码格式错误 密码只能是英文字母开头 长度为3至7位'
        }
        if(errMsg){
            $err.html(errMsg)
            return false
        }
        $err.html('')
        $.ajax({
            url:'/users/login',
            type:'POST',
            dataType:'json',
            data:{
                username:inputUsername,
                password:inputPassword
            },
            success:function(result){
                if(result.code == 0){
                    //刷新当前页面
                    window.location.reload()
                }else{
                    $err.html(result.message)
                }
            },
            error:function(){
                $err.html('服务器端错误')
            }
        })
        
    })

    
    
})(jQuery)