// 这个文件主要是用来处理用户状态的
import moment from 'moment'
// 保存登录状态
export const saveUsername = (username)=>{
    return window.localStorage.setItem('username',username)
}
// 获取登录状态
export const getUsername = ()=>{
    return window.localStorage.getItem('username')
}
// 移除登录状态
export const removeUsername = ()=>{
    return window.localStorage.removeItem('username')
}

export const goLogin = ()=>{
    window.location.href = '/login'
}

export const goHome = ()=>{
    window.location.href = '/'
}

export const  formatDate = (date)=>moment(date).format('YYYY-MM-DD HH:mm:ss')