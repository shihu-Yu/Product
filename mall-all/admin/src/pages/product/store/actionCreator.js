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
const setCategories = (payload)=>({
    type:types.SET_CATEGORIES,
    payload:payload,
   
})
const setAllAttrs = (payload)=>({
    type:types.SET_ALL_ATTRS,
    payload:payload
})
// 获取分类列表
export const getPageAction = (page)=>{
    return async function(dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getCategoriesList({
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


export const getUpdateOrderAction = (id,newOrder)=>{
    return async function(dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try{
            const result = await api.updateCategoriesOrder({
                id:id,
                order:newOrder,
                page:page
            })
            if(result.code == 0){
                dispatch(setPage(result.data))
                message.success('修改成功',1)
            }
            else{
                message.error(result.message,1)
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

export const getSaveAction = (values,id)=>{
    return async function(dispatch,getState){
        try{
            const icon = getState().get('category').get('icon')
            if(!icon){
                dispatch(setIconError())
                return
            }
            let request = api.addCategory
            let saveMessage = "添加分类成功"
            values.icon = icon
            if(id){
                values.id = id 
                request = api.updateCategory
                saveMessage = "修改分类成功"
            }
            const result = await request(values)
            if(result.code == 0){
                message.success(saveMessage,1)
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
// 获取分类数据
export const getLevelCategoriesAction = ()=>{
    return async function(dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getLevelCategories({
                level:3
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


export const getAllAttrsAction = ()=>{
    return async function(dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getAllAttrs()
            if(result.code == 0){
                dispatch(setAllAttrs(result.data))
            }   
        }
        catch(e){
            message.error('网络请求失败',1)
        }
    } 
}

