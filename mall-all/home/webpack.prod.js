// 生产环境下的配置
// webpack.prod.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production'//mode用来指定环境,可以是development(开发环境) 或者 production(生产环境),这两个环境下的构建目标存在着巨大差异，建议为每个环境编写彼此独立的 webpack 配置
});