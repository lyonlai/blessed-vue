/* @flow */

import { extend } from 'shared/util'
import { setAttribute } from 'util/index'
import { refreshNode } from '../util'

function updateAttrs (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  let key, cur, old
  const elm = vnode.elm
  const oldAttrs = oldVnode.data.attrs || {}
  let attrs: any = vnode.data.attrs || {}
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  for (key in attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    if (old !== cur) {
      setAttribute(elm, key, cur)
    }
  }

  for (key in oldAttrs) {
    if (attrs[key] == null) {
      setAttribute(elm, key, null)
    }
  }

  refreshNode(elm)
}

export default {
  create: updateAttrs,
  update: updateAttrs
}
