// mock模拟数据
import Mock from 'mockjs'
let mallData = Mock.mock({
    "mallList|10": [
        {
            "id":"@id()",
            "name": "@cword(5)",
            "category":"@cword(3,7)",
            "desc":"@csentence(5,10)",
            "address":"@city(true)",
            "shop":'@cword',
            "shopId":"@id()",
        }, 
    ], 
})
export default{
    getMallData:()=>{
        let data = mallData
        return{
            code:20000,
            data,
        }
    },
    // 添加产品
    addMall(options){
        let addMall = JSON.parse(options.body)
        addMall.id = Date.now()
        mallData.mallList.push(addMall)
    },
    // 编辑产品
    editMall(options){
        let editMall = JSON.parse(options.body)
        let index = mallData.mallList.findIndex(item=>item.id == editMall.id)
        // 更改该user的数据
        mallData.mallList.splice(index,1,editMall)
    },
    // 删除产品
    delMall(options){
        console.log(options)
        // 利用正则解析字符串
        let path = options.url.match(/\/api\/mall\/del(.*)/)
        let param = path[1].match(/(.*)\?(.*)=(.*)/)
        let id = param[3]
        console.log(id)
        let index = mallData.mallList.findIndex(item=>item.id == id)
        // 删除当前坐标的数据该数据
        mallData.mallList.splice(index,1)
    }
}