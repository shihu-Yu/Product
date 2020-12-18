require('./index.less')
var api = require('api')
var _util = require('util')
// var tpl = require('./nav.tpl')
var page = {
    init:function(){
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this 
        $('.search-input').on('keyup',function(){
            _this.submit()
        })
    },
    submit:function(){
        // 获取数据
        var $keyword = $.trim(('.search-input').val())
        
    }
}

$(function(){
    page.init()
})