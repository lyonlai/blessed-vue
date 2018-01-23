const path = require('path')

const vuePath = '../node_modules/vue'

module.exports = {
  compiler: path.resolve(__dirname, vuePath, 'src/compiler'),
  core: path.resolve(__dirname, vuePath, 'src/core'),
  shared: path.resolve(__dirname, vuePath, 'src/shared'),
  web: path.resolve(__dirname, vuePath, 'src/platforms/web'),
  weex: path.resolve(__dirname, vuePath, 'src/platforms/weex'),
  sfc: path.resolve(__dirname, vuePath, 'src/sfc'),
  runtime: path.resolve(__dirname, '../src/runtime'),
  util: path.resolve(__dirname, '../src/util')
}
