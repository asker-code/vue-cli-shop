'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 合并对象
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
