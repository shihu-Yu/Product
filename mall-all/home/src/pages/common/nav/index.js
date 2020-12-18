require('./index.less')
var api = require('api')
var _util = require('util')
var tpl = require('./nav.tpl')
var page = {
    init:function(){
        this.$cartContent  = $('.cart-content')
        
        this.loadUsername()
        this.bindEvent()
    },
    loadUsername:function(){
        api.getUsername({
            success:function(result){
                $('.not-login').hide()
                $('.login').show('').find('.username').text(result.username)
            }
        })
    },
    bindEvent:function(){
        var _this = this 
        // 退出
        $('#logout').on('click',function(){
            api.logout({
                success:function(){
                    window.location.reload()
                }
            })
        })

        // 购物车
        $('.top .cart-box').hover(function(){
            // 显示数据面板
            _this.$cartContent.show()
            _this.$cartContent.html('<div class="loader"></div>')

            // 发送请求
            api.getCarts({
                success:function(cart){
                    _this.render(cart)
                },
                error:function(){
                    _this.$cartContent.html('<span class="empty-cart">获取购物车失败,请稍后再试!</span>')
                }
            })
        },function(){
            _this.$cartContent.hide()

        })
    },
    loadCartCounts:function(){
        var $cartCount = $('cart-count')
        api.getCartsCount({
            success:function(count){
                $cartCount.text(count || 0)
            },
            error:function(){
                $cartCount.text(0)
            }
        })
    },
    render:function(cart){
        var _this = this 
        if(cart.cartList.length == 0){
            _this.$cartContent.html('<span class="empty-cart">购物车中还没有商品,赶紧来购买吧!</span>')
        }else{
            var html = _util.render(tpl,cart)
            _this.$cartContent.html(html)
        }
    },
}

$(function(){
    page.init()
})