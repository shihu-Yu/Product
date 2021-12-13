// module.exports={
//     getParamFromUrl: function (key) {
//         var query = window.location.search.substr(1)
//         var reg = new RegExp('(^|&)' + key + '=' + '([^&]*)(&|$)')
//         var result = query.match(reg)
//         return result ? decodeURIComponent(result[2]) : null
//     }
// }
// 保存登录状态
export const saveUsername = (username)=>{
    return window.sessionStorage.setItem('username',username)
}
// 获取登录状态
export const getUsername = ()=>{
    return window.sessionStorage.getItem('username')
}
// 移除登录状态
export const removeUsername = ()=>{
    return window.sessionStorage.removeItem('username')
}
export const goLogin = ()=>{
    window.location.href = '/login'
}
export const goHome = ()=>{
    window.location.href = '/'
}
export const goRegister = ()=>{
    window.location.href = '/register'
}
