;(function($){
    $.fn.extend({
        pagination:function(options){
            return this.each(function(){
                var $this = $(this)
                $('.pagination').on('click','a',function(){
                    var $elem = $(this)
                    //获取  当前添加active class的页码
                    var currentPage = $('.pagination').find('li.active a').html()
                    currentPage = parseInt(currentPage)
                    //获取 当前点击的页码
                    var page = $elem.html()
                    //获取切换按钮属性
                    const tableText = $elem.attr('aria-label')

                    //上一页切换
                    // 获取总页数
                    var pages = $this.find('a').eq(-2).html()
                    if(tableText == 'Previous'){
                        // 如果当前的带有active 的页码是第一页时 阻止默认行为使上一页按钮不能够被点击
                        if(currentPage == 1){
                            return false
                        }
                        page = currentPage - 1
                    }

                    //下一页切换
                    if(tableText == 'Next'){
                        // 如果当前的带有active 的页码是最后一页时 阻止默认行为使下一页按钮不能够被点击
                        if(currentPage == pages){
                            return false
                        }
                        page = currentPage + 1
                    }
                    // 如果当前的带有active 的页码 和被点击的是同一个时 阻止当前的默认行为 使其不能够点击
                    if(currentPage == page){
                        return false
                    }
                    //发送ajax

                })    
            })
        }
    })
})(jQuery)