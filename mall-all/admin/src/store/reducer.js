import { combineReducers } from 'redux-immutable'


import {reducer as login} from 'pages/login/store'
import {reducer as home} from 'pages/home/store'


//合并所有组件的reduer
export default combineReducers({
    login,
    home
})