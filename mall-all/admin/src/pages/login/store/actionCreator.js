
// import {LOAD_DATA,CHANGE_DATA,ADD_DATA,DEL_DATA} from './actionTypes'
import * as types  from './actionTypes'
import axios from 'axios'
import { message } from 'antd'
import regeneratorRuntime from "regenerator-runtime"


// 异步处理初始化网络数据
export const getLoginDataAction = (values)=>{
    return async function (dispatch){
        const result = await axios({
            method:'post',
            url:'/v1/users/login',
            data:{
                username:values.username,
                password:values.password,
                role:'admin',
                captchaCode:values.captcha,
                channel:'page'
            }
        })
        const data = result.data
        if(data.code == 1){
            message.error(data.message,1)   
        }else{
            message.success('登陆成功',1)
        }

    } 
}