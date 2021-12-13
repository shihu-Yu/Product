export default {
    CarouseImages:[
        {url:require('../images/carouse_01.jpg')},
        {url:require('../images/carouse_02.jpg')},
        {url:require('../images/carouse_03.jpg')},
    ],
    // 这里的imgUrl 不能写成imgUrl:"../images/nav02.png"这种相对路径
    // 要写成imgUrl:require("../images/nav01.jpg")这种形式
    navData:[
        {name:'母婴产品',label:'muying',imgUrl:require("../images/nav01.jpg")},
        {name:'手机通讯',label:'phone',imgUrl:require("../images/nav02.png")},
        {name:'汽车保养',label:'car',imgUrl:require("../images/nav03.jpg")},
        {name:'酒水饮料',label:'jiushui',imgUrl:require("../images/nav04.png")},
        {name:'家用电器',label:'dianqi',imgUrl:require("../images/nav05.jpg")},
        {name:'数码产品',label:'shuma',imgUrl:require("../images/nav06.png")},
        {name:'食品生鲜',label:'shengxian',imgUrl:require("../images/nav07.jpg")},
        {name:'家居用品',label:'家居',imgUrl:require("../images/nav08.jpg")},
    ]
}