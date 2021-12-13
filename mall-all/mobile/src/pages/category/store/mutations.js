import {CHANGE_CATEGORY_ACTIVE} from './types'
export default {
   [CHANGE_CATEGORY_ACTIVE](state,payload){
       state.active = payload
   }
}