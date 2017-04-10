/* @flow */

import Vue from 'core/index'
import { patch } from 'runtime/patch'
import { dom } from 'util/index'
import { noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { inBrowser } from 'core/util/index'

import {
  mustUseProp,
  isReservedTag,
  getTagNamespace,
  isUnknownElement
} from 'util/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? noop : patch

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating?: boolean
): Component {
  return mountComponent(this, el, true)
}

Vue.dom = dom

export default Vue
