require('pages/common/logo')
require('pages/common/footer')
require('./index.less')
var _util = require('util')
var api = require('api')
var  formErr = {
    show:function(msg){
        $('.error-item').show().find('.error-msg').html(msg)
    },
    hide:function(msg){
        $('.error-item').hide().find('.error-msg').html('')
    }
}
var page = {
    init:function(){
        this.bindevent()
         // 获取验证码
         this.getCaptcha()
    },
    // 获取验证码
    getCaptcha:function(){
        api.getCaptcha({
            success:function(result){
                // 把请求回来的图形验证码 插入到前端界面
                $('.captcha-img').html(result)
            }
        })
    },
    bindevent:function(){
        var _this = this
        // 点击提交 绑定事件

        $('#btn-submit').on('click',function(){
            _this.submit()
        })
        // 回车提交
        $('input').on('keydown',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
        // 点击图形验证码 刷新验证码
        $('.captcha-img').on('click',function(){
            // 获取验证码
            _this.getCaptcha()
        })
    },
    // 注册的提交
    submit:function(){
        // 获取表单的数据
        var formData = {
            username:$('input[name="username"]').val(),
            password:$('input[name="password"]').val(),
            captchaCode:$('input[name="captcha-code"]').val(),
        }
        // 验证
            var result = this.validate(formData)
            if(result.status){
                // 验证成功
                formErr.hide()
                 // 提交
                api.login({
                    data:formData,
                    success:function(result){
                        window.location.href = _util.getParamFromUrl('redirect') || "/"
                    },
                    error:function(msg){
                        formErr.show(msg)
                    }
                })
            }else{
                formErr.show(result.msg)
            }
    },
    validate:function(formData){
        var result = {
            status:false,
            msg:''
        }

        if(!_util.validate(formData.username,'require')){
            result.msg = '手机号不能为空'
            return result
        }
        if(!_util.validate(formData.username,'phone')){
            result.msg = '手机号格式不正确'
            return result
        }
       //图形验证码不能为空
       if (!_util.validate(formData.captchaCode, 'require')) {
        result.msg = "图形验证码不能为空"
        return result
        }
        //图形验证码格式验证
        if (!_util.validate(formData.captchaCode, 'captchaCode')) {
            result.msg = "图形验证码格式不正确"
            return result
        }
        if(!_util.validate(formData.password,'require')){
            result.msg = '密码不能为空'
            return result
        }
        if(!_util.validate(formData.password,'password')){
            result.msg = '密码格式不正确'
            return result
        }
        
        result.status = true
        return result
    },
    
}    

$(function(){
    page.init()
})