// api的配置文件
export const SERVER =  process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'

export const API_CONFIG = {
    // 数组中第一个参数是请求地址 第二个参数是请求方法

    login:                        ['/users/login','post'],
    getCaptcha:                   ['/users/captcha','get'],
    getCounts:                    ['/counts','get'],
    logout:                       ['/users/logout','get']
}