import * as types  from './actionTypes'

import api from 'api'
import { message } from 'antd'
const getPageRequestStart = ()=>({
    type:types.PAGE_REQUEST_START
})
const getPageRequestEnd = ()=>({
    type:types.PAGE_REQUEST_END
})
const setPage = (payload)=>({
    type:types.SET_PAGE,
    payload:payload
})

// 获取用户列表
export const getPageAction = (page)=>{
    return async function(dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getUserList({
                page:page
            })
            if(result.code == 0){
                dispatch(setPage(result.data))
            }   
        }
        catch(e){
            message.error('网络请求失败',1)
        }
        finally{
            dispatch(getPageRequestEnd())
        }
        
    }

}

export const getUpdateIsActive = (id,newActive)=>{
    return async function(dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('user').get('current')
        try{
            const result = await api.updateUsersIsActive({
                id:id,
                isActive:newActive,
                page:page
            })
            console.log(result)
            if(result.code == 0){
                dispatch(setPage(result.data))
                message.success('修改成功',1)
            }   
        }
        catch(e){
            message.error('网络请求失败',1)
        }
        finally{
            dispatch(getPageRequestEnd())
        }
    } 
}

export const setIcon = (payload)=>({
    type:types.SET_ICON,
    payload:payload
})

const setIconError = ()=>({
    type:types.SET_ICON_ERROR,
})
const setCategories = (payload)=>({
    type:types.SET_CATEGORIES,
    payload:payload
})
export const getSaveAction = (values)=>{
    return async function(dispatch,getState){
        try{
            const icon = getState().get('category').get('icon')
            if(!icon){
                dispatch(setIconError())
                return
            }
            values.icon = icon
            const result = await api.addCategory(values)
            if(result.code == 0){
                message.success('添加分类成功',1)
                dispatch(setCategories(result.data))
            }else{
                message.error(result.message,1)
            }
        }
        catch(e){
            message.error('网络请求失败',1)
        }   
    }
}
// 
export const getValidateAction = ()=>{
    return async function(dispatch,getState){
        const icon = getState().get('category').get('icon')
        if(!icon){
            dispatch(setIconError())
            return
        }  
    }    
}

export const getLevelCategoriesAction = ()=>{
    return async function(dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getLevelCategories({
                level:2
            })
            if(result.code == 0){
                dispatch(setCategories(result.data))
            }   
        }
        catch(e){
            message.error('网络请求失败',1)
        }
    } 
}
