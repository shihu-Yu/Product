// webpack.dev.js

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',//内容的目录,将dist目录下的文件serve到localhost:8080下运行
        port: 3002,//服务运行的端口
        historyApiFallback:true,//改行代码是当App.js 中使用BrowserRouter时需要配置的内容
        open:true,
        // 解决开发环境中的跨域问题 的配置 添加该配置之后要重启webpack
        proxy: {
            //所有以/v1开头的请求会被代理到服务器http://127.0.0.1:3000上
            '/v1': 'http://127.0.0.1:3000'
          }
    }
})