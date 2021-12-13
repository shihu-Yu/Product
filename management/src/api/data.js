import axios from './axios'

export const getMenu=()=>{
   return axios.request({
    url:'menu',
    method:'get'
   })
}
export const getHome = ()=>{
    return axios.request({
        url:'/home/getData',
        method:'get'
    })
}
export const getUser = ()=>{
    return axios.request({
        url:'/user/getData',
        method:'get'
    })
}
export const getMall = ()=>{
    return axios.request({
        url:'/mall/getData',
        method:'get'
    })
}


