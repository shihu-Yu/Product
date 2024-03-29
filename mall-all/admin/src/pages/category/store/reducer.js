import * as types from './actionTypes'
import {fromJS} from 'immutable'
import { actionCreator } from '.'
// 定义一个初始化的state
let defaultState = fromJS({
       list:[],
       total:0,
       pageSize:0,
       current:1,
       isFetching:false,
      
       categories:[],
}) 

function reducer(state=defaultState,action) {
    if(action.type == types.SET_PAGE){
        const { list,current,pageSize,total,isFetching } = action.payload
        return state.merge({
            list,
            current,
            total,
            pageSize,
            isFetching
        })
    }
    if(action.type == types.PAGE_REQUEST_START){
        return state.set('isFetching',true)
    }
    if(action.type == types.PAGE_REQUEST_END){
        return state.set('isFetching',false)
    }
   
    if(action.type == types.SET_CATEGORIES){
        return state.set('categories',action.payload)
    }
    if(action.type == types.CLEAR_PAGE){
        return state.set('list',[])
    }
    return state
    
}      
export default reducer