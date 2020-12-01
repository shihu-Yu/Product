// 文件的目标 生成一个对象，这个对象的每一个属性是一个方法名，属性值是一个api的调用方法
import { SERVER,API_CONFIG,VERSION } from './config'
import axios from 'axios'


/**
 * 生成一个对象，这个对象的每一个属性是一个方法名，属性值是一个api的调用方法
 * @param {object} apiConfig 
 */
const getApiObj = (apiConfig)=>{
    const apiObj = {}
    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            const url = SERVER + '/' + VERSION + apiConfig[key][0] || ''
            const method = apiConfig[key][1] || 'get'
            // 发送请求
            return request(url,method,data)
        }
    }
    return apiObj
}

// 定义发送请求的函数
const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        const options = {
            method:method,
            url:url,
            data:data
        }
        axios(options)
        .then(result=>{
            const data = result.data
            resolve(data)
        })
        .catch(e=>{
            reject(e)
        })
    })
}

export default getApiObj(API_CONFIG)
