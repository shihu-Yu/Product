require('./index.less')
var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')
var cache = {
    data: {},
    count: 0,
    addData: function (key, val) {
        this.data[key] = val;
        this.count++;
    },
    getData: function (key) {
        return this.data[key];
    }
}
var page = {
    init:function(){
        this.$searchLayer = $('.search-layer')
        this.$searchInput = $('.search-input')
        this.$navLinks = $('.search-wrap .nav-list .nav-item a')
        this.initSearchInput()
        this.setNavActive()
        this.bindEvent()
        this.isLoaded = false
        this.autocomplete()
    },
    bindEvent:function(){
        var _this = this 
        $('.btn-search').on('click',function(){
            _this.submit()
        })
        this.$searchInput.on('keyup',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
    },
    submit:function(){
        // 获取数据
        var keyword = $.trim($('.search-input').val())
        window.location.href = './list.html?keyword=' + keyword
    },
    showLayer:function(){
        if (!this.isLoaded) return;
        this.$searchLayer.show()
    },
    hideLayer:function(){
        this.$searchLayer.hide()
    },
    appendHtml:function(html){
        this.$searchLayer.html(html)
        this.isLoaded = !!html
    },
    initSearchInput:function(){
        var keyword = _util.getParamFromUrl('keyword') || ''
        if (keyword) {
            this.$searchInput.val(keyword)
        }
    },
    setNavActive:function(){

    },
    autocomplete:function(){
        var _this = this 
        this.$searchInput.on('input',function(ev){
            // 防止快速输入多次请求
            clearTimeout(_this.timer)
            _this.timer = setTimeout(function(){
                _this.getData()
            },200)
        })
            //点击页面其它地方隐藏下拉层
            $(document).on('click', $.proxy(this.hideLayer, this));
            //input获取焦点时显示下拉层
            this.$searchInput.on('focus', $.proxy(this.showLayer, this));
            //阻止input上的click事件冒泡到document上触发隐藏
            this.$searchInput.on('click', function (ev) {
                ev.stopPropagation();
            });
            // /6.用事件代理处理下拉层中每一项的点击事件
            this.$searchLayer.on('click','search-item',function(){
                var val = $(this).html()
                _this.inputVal(val)
                _this.submit()
            })
    },
    setInputVal: function (val) {
        this.$searchInput.val(val.replace(/<[^<>]+>/g, ''));
    },
    getInputVal:function(){
        return $.trim(this.$searchInput.val())
    },
    handleData:function(data){
        var html = _util.render(tpl,{
            list:data
        })
        this.appendHtml(html)
        this.showLayer()
    },
    getData:function(){
        var _this  = this
        var inputVal = _this.getInputVal()
        if(inputVal == ''){
            this.appendHtml('')
            this.hideLayer()
            return
        }
        if(cache.getData(inputVal)){
            this.handleData(cache.getData(inputVal))
            return
        }
        api.getProductsSearchList({
            data:{
                keyword:inputVal
            },
            success:function(products){
                if(products.length > 0){
                    _this.handleData(products)
                    cache.addData(inputVal,products)
                }else{
                    _this.appendHtml('')
                    _this.hideLayer()
                }
            },
            error:function(){
                _this.appendHtml('')
                _this.hideLayer()
            }
        })
    }
}

$(function(){
    page.init()
})