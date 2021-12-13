// mock模拟数据
import Mock from 'mockjs'
let userData = Mock.mock({
    "userList|10": [
        {
            "id":"@id()",
            "name": "@word",
            "email":"@email()",
            "age|1-100":1,
            "sex|0-1":1,
            "birth":"@datetime('yyyy-MM-dd')",
            "addr":"@city(true)",
            "operation":''
        }, 
    ], 
})
let adminList = Mock.mock(
    [
        {
            username:"admin",
            password:"admin"
        },
        {
            username:"test",
            password:"test"
        },
    ]
)
export default{
    getUserData:()=>{
        let data = userData
        return{
            code:20000,
            data,
        }
    },
    // 登录
    login(options){
        let user =JSON.parse(options.body)
        let username = user.username
        let password = user.password
        let status = adminList.findIndex(
            item=>item.username == username && item.password == password)
        if(status == -1){
            let data = {
                code:404,
                msg:'用户名不存在或者密码错误'
            }
            return data
        }else{
            let data = {
                code:200,
                msg:'登录成功'
            }
            return data
        }
    },
    // 注册用户
    Register(options){
        let regUser = JSON.parse(options.body)
        adminList.push(regUser)
        let data = {
            code:200,
            msg:'注册成功'
        }
        return data
    },
    // 搜索用户
    searchUser(options){
        let searchUser = JSON.parse(options.body)
        let username = searchUser.username
        let id = searchUser.keyword
        let sex = searchUser.sex
        let index = userData.userList.findIndex(item=>item.id == id || (item.name == username && item.sex == sex))
        if(index == -1){
            let data ={
                code:404,
                msg:'用户不存在'
            }
            return data
        }else{
                return userData.userList[index]
            }
    },
    // 添加用户
    addUserList(options){
        let addUser = JSON.parse(options.body)
        addUser.id = Date.now()
        userData.userList.push(addUser)
    },
    // 编辑用户
    EditUser(options){
        let editUser = JSON.parse(options.body)
        let index = userData.userList.findIndex(item=>item.id == editUser.id)
        // 更改该user的数据
        userData.userList.splice(index,1,editUser)
    },
    // 删除用户
    delUser(options){
        // 利用正则解析字符串
        let path = options.url.match(/\/api\/user\/del(.*)/)
        let param = path[1].match(/(.*)\?(.*)=(.*)/)
        let id = param[3]
        console.log(id)
        let index = userData.userList.findIndex(item=>item.id == id)
        // 删除当前坐标的数据该数据
        userData.userList.splice(index,1)
    },
    updatePass(options){
        let user = JSON.parse(options.body)
        console.log(user)
        let index = userData.userList.findIndex(item=>item.username == user.username)
        // 更改该user的数据
        adminList.splice(index,1,user)
        console.log(adminList)
        let data = {
            code:200,
            adminList
        }
        return data
    }
}