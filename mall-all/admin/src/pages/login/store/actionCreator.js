
import * as types  from './actionTypes'
import axios from 'axios'
import { message } from 'antd'
import regeneratorRuntime from "regenerator-runtime"
import { saveUsername} from 'util'
import api from 'api'


const getRequestStart = ()=>({
    type:types.REQUEST_START
})
const getRequestEnd = ()=>({
    type:types.REQUEST_END
})
const setCaptcha = (captcha)=>({
    type:types.SET_CAPTCHA,
    payload:captcha
})

// 定义获取验证码的函数
export const getCaptchaAction = ()=>{
    /*
    // 发送请求请求验证码图片
    return async function(dispatch){
        const result = await axios({
            method:'get',
            url:'/v1/users/captcha'
        })
        if(result.data.code == 0){
            dispatch(setCaptcha(result.data.data))
        }
    }
    */
   return async function(dispatch){
       const result = await api.getCaptcha()
       if(result.code == 0){
        dispatch(setCaptcha(result.data))
    }
   }

}


// 异步处理初始化网络数据
export const getLoginDataAction = (values)=>{
    return async function (dispatch){
        dispatch(getRequestStart())
       const data = await api.login({
        username: values.username,
        password: values.password,
        role: 'admin',
        captchaCode: values.captcha,
        channel: 'page'
       })
        if(data.code == 1){
            message.error(data.message,1)   
        }else{
            message.success('登陆成功',1)
            // 保存登录状态
            saveUsername(data.data.username)
            // 转跳界面
            window.location.href = '/'
        }
        dispatch(getRequestEnd())
    } 
}