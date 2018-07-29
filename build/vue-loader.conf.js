'use strict'
// 工具模块
const utils = require('./utils')
// 开发和生产的配置参数
const config = require('../config')
// process node全局对象，保存的是node进程相关的参数
const isProduction = process.env.NODE_ENV === 'production'   //boolean true是生产环境
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

// 导出对象
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled, //sourceMap 方便调试代码
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
