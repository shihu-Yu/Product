import * as types from './actionTypes'
import {fromJS} from 'immutable'
// 定义一个初始化的state
let defaultState = fromJS({
       list:[]
}) 

function reducer(state=defaultState,action) {
    if(action.type == types.SET_PAGE){
        return state.merge({
            list:[]
        })
    }
    
}      
export default reducer