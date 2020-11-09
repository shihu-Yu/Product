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
    // 构建文章列表的html
    function buildArticleHtml(docs){
        var html = ''
        for(var i = 0,len=docs.length;i<len;i++){
            html += `<div class="panel panel-default article-panel">
                        <!-- Default panel contents -->
                        <div class="panel-heading">
                            <a href="/detail/${docs[i]._id.toString()}"> 
                                <h3 class="panel-title">${docs[i].title}</h3>
                            </a>      
                        </div>
                        <div class="panel-body" >${docs[i].intro}</div>
                        <div class="panel-footer">
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <span class="footer-text text-muted">${docs[i].user.username}</span>
                            <span class="glyphicon glyphicon-list" aria-hidden="true"></span>
                            <span class="footer-text text-muted">${docs[i].category.name}</span>
                            <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                            <span class="footer-text text-muted">${docs[i].createdTime}</span>
                            <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                            <span class="footer-text text-muted"><span class="view-num">${docs[i].click}</span>人已阅读</span>
                        </div>
                    </div>`
        }
        return html
    }
    // 构建分页分页器 html
    function buildPaginationHtml(list,page,pages){
        var html = ''
        if(page == 1){
            html += `<li class="disabled">`
        }else{
            html += `<li>`
        }
        html +=         `<a href="javascript:;" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
        for(var i = 0,len=list.length;i<len;i++){
            if(list[i] == page){
                html += `<li class="active">`
            }else{
                html += `<li>`
            }
            html += `<a href="javascript:;">${list[i]}</a></li>`
        }
            if(page == pages){
                html += `<li class="disabled">`
            }else{
                html += `<li>`
            }
            html += `       <a href="javascript:;" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>`
            return html
        }

    var $articlePage = $('#article-page')
    $articlePage.on('get-data',function(ev,data){
        //构建文章列表html并且渲染
        var articleHtml = buildArticleHtml(data.docs)
        $('#article-wrap').html(articleHtml)
        //构建分页器html并且渲染
        if(data.pages <=1){
            $articlePage.html('')
        }else{
            var paginationHtml = buildPaginationHtml(data.list,data.page,data.pages)
            $articlePage.find('.pagination').html(paginationHtml)
        }
    })
    // 调用分页jquery插件
    $articlePage.pagination({
        url:"articlesList"
    })
    
})(jQuery)