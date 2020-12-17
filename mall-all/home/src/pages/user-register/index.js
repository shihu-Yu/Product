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
        this.handleTimer()
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
        // 获取验证码
        $('#btn-verify-code').on('click',function(){
            if($(this).hasClass('disable-btn')){
                return
            }
            // 显示验证码框
            $('.captcha-box').show()
            // 获取验证码
            _this.getCaptcha()
            
        })
        // 点击图形验证码 刷新验证码
        $('.captcha-img').on('click',function(){
            // 获取验证码
            _this.getCaptcha()
        })
        // 发送获取验证码请求
        $('#btn-captcha-code').on('click',function(){
            _this.getVerifyCodeRequest()
        })
    },
    // 注册的提交
    submit:function(){
        // 获取表单的数据
        var formData = {
            phone:$('input[name="phone"]').val(),
            verifyCode:$('input[name="verify-code"]').val(),
            password:$('input[name="password"]').val(),
            repassword:$('input[name="repassword"]').val(),
        }
        // 验证
            var result = this.validate(formData)
            if(result.status){
                // 验证成功
                formErr.hide()
                 // 提交
                api.register({
                    data:formData,
                    success:function(result){
                        _util.goResult('register')
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

        if(!_util.validate(formData.phone,'require')){
            result.msg = '手机号不能为空'
            return result
        }
        if(!_util.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确'
            return result
        }
        if(!_util.validate(formData.verifyCode,'require')){
            result.msg = '验证码不能为空'
            return result
        }
        if(!_util.validate(formData.verifyCode,'verifyCode')){
            result.msg = '验证码格式不正确'
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
        if(formData.password != formData.repassword){
            result.msg = '输入两次密码不一致'
            return result
        }
        result.status = true
        return result
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
    // 获取验证码请求
    getVerifyCodeRequest:function(){
        var _this = this
        // 获取输入的手机号以及验证码 并且验证
        var phone = $.trim($('input[name="phone"]').val())
        var captchaCode = $.trim($('input[name="captcha-code"]').val())
        if(!_util.validate(phone,'require')){
            formErr.show('手机号不能为空') 
            return 
        }
        if(!_util.validate(phone,'phone')){
            formErr.show('手机号格式不正确')
            return 
        }
        if(!_util.validate(captchaCode,'require')){
            formErr.show('图形验证码不能为空') 
            return 
        }
        if(!_util.validate(captchaCode,'captchaCode')){
            formErr.show('图形验证码格式不正确')
            return 
        }
        formErr.hide()
        // 发送请求
        api.getRegisterVerifyCode({
            data:{
                phone:phone,
                captchaCode:captchaCode

            },
            success:function(){
                _util.showSuccessMsg('手机验证码发送成功')
                $('input[name="captcha-code"]').val('')
                // 获取成功之后隐藏该获取界面
                $('.captcha-box').hide()
                window.localStorage.setItem('getRegisterVerifyCodeTime',Date.now())
                _this.handleTimer()
            },  
            error:function(msg){
                formErr.show(msg)
            }
        })
    },
    // 处理验证码倒计时
    handleTimer:function(){
        var _this = this
        var $btn = $('#btn-verify-code')
        var getRegisterVerifyCodeTime = window.localStorage.getItem('getRegisterVerifyCodeTime')
        if(getRegisterVerifyCodeTime){
            var totalSecond = 60
            var passedSecond = parseInt((Date.now() - getRegisterVerifyCodeTime) / 1000)
            var restSecond = totalSecond - passedSecond
            if(restSecond > 0){
                $btn.addClass('disable-btn')
                $btn.html(restSecond + 's后重试')
                _this.timer = setInterval(function(){
                    var passedSecond = parseInt((Date.now() - getRegisterVerifyCodeTime) / 1000)
                    var restSecond = totalSecond - passedSecond
                    if(restSecond <= 0){
                        clearInterval(_this.timer)
                        $btn.removeClass('disable-btn').html('获取验证码') 
                    }else{
                        $btn.html(restSecond + 's后重试').off('click')
                    }
                },1000)
            }else{
                clearInterval(_this.timer)
                $btn.removeClass('disable-btn').html('获取验证码') 
                window.localStorage.removeItem('getRegisterVerifyCodeTime')
            }
        }
    }
}

$(function(){
    page.init()
})