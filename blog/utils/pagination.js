//分页 后端共通函数

const { populate } = require("../models/user")

/*所需要传输的数据
 * @param {} options
limit 表示每页显示多少数据
page  表示当前被请求的页数
sort  表示按什么样式 排序  
model 表示使用用户模型生成的用户数据
query 表示查找数据的条件
projection  表示查询数据时 不被显示出来的数据属性 

*/
module.exports = async (options)=>{
    //定义 并且进行结构赋值
    let {limit:limit=6 , page,sort:sort={_id:-1} , model ,query:query={},projection:projection="" , populates}  = options
    //这里相当于给page 赋值  不能使用let 否则会报错
    page = parseInt(page)
   
    
    if(isNaN(page)){
        page = 1
    }
    if(page<0){
        page = 1
    }
    //根据请求的页码计算需要显示的数据
    /*
    假设总共有六条数据
    page = 1 需要显示1,2条数据 limit(2)
    page = 2 需要显示3 4条数据 limit(2) skip(2)
    page = 3 需要显示5 6条数据 limit(2) skip(4)
    每页显示两条数据

    skip((page - 1)*limit)
    */
  
    //计算总页数
    const total = await model.estimatedDocumentCount(query)
    const pages = Math.ceil(total / limit)
    if(pages == 0){
        return {
            docs:0,
            pages:0,
            list:[],
            page
        }
    }
    if(page > pages){
        page = pages
    }
    const skip = (page - 1)*limit
    const list = []
    for(let i = 1;i<=pages;i++){
        list.push(i)
    }

    //关联处理
    const result = model.find(query,projection)
    if(populates){
        populates.forEach(populate => {
            result.populate(populate)
        })
    }
    //获取数据
    const docs = await result.sort(sort).skip(skip).limit(limit)
    return {
        docs,
        pages,
        list,
        page
    }
}