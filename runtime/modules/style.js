/* @flow */

import { normalizeStyleBinding, transformStaticStyle } from 'node-blessed/util/style'
import { setAttribute } from 'node-blessed/util/attrs'

function updateStyle (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  const data = vnode.data
  const oldData = oldVnode.data

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  const el: any = vnode.elm

  const staticStyle = data.staticStyle && transformStaticStyle(data.staticStyle)

  const style = normalizeStyleBinding(data.style) || {}

  setAttribute(el, 'style', staticStyle || style)
}

export default {
  create: updateStyle,
  update: updateStyle
}
