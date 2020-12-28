const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
module.exports = merge(common, {
    devServer: {
        port: 3003,
        proxy: {           
            '/':{
                target: 'http://127.0.0.1:3000',
                ws: false,
                changeOrigin: true               
            }
        }
    }, 
})