require('pages/common/logo')
require('pages/common/footer')
require('./index.less')
 var _util = require('util')
 $(function(){
    var type = _util.getParamFromUrl('type') || 'default'
    if(type == 'payment'){
        var orderNo = _util.getParamFromUrl('orderNo')
        var $btn = $('.order-detail')
        var url = $btn.attr('href')+orderNo
        $btn.attr('href',url)
    }
    $('.'+type).show()
})