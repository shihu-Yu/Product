import * as types  from './actionTypes'

import api from 'api'

const setPage = (captcha)=>({
    type:types.SET_PAGE,
    payload:captcha
})

// 获取用户列表
export const getPageAction = ()=>{
    return async function(dispatch){
        const result = await api.getUserList()
        console.log(result)
        if(result.code == 0){
            dispatch(setPage(result.data))
        }   
    }

}
