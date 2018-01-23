const path = require('path')
import buble from 'rollup-plugin-buble'
import flow from 'rollup-plugin-flow-no-whitespace'
import alias from 'rollup-plugin-alias'
import replace from 'rollup-plugin-replace'

const version = process.env.VERSION || require('../package.json').version

export default {
  input: path.resolve(__dirname, '../src/index.js'),
  output: {
      name: 'BlessedVue',
      file: path.resolve(__dirname, '../dist/build.js'),
      format: 'cjs'
  },
  plugins: [
    replace({
      __WEEX__: false,
      __VERSION__: version
    }),
    flow(),
    buble(),
    alias(Object.assign({ he: './entity-decoder' }, require('./alias')))
  ],
  external: [
    'blessed',
    'lodash',
    'blessed-contrib'
  ]
}
