/* @flow */

import Vue from './runtime'
import { shouldDecodeNewlines } from 'util/compat'
import { compileToFunctions } from 'web/compiler/index'

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    const template = options.template

    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el, hydrating)
}

Vue.compile = compileToFunctions

export default Vue
