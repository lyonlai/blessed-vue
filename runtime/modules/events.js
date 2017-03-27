/* @flow */

import { updateListeners } from 'core/vdom/helpers/index'

let target

function add (
  event: string,
  handler: Function,
  once: boolean,
  capture: boolean
) {
  if (once) {
    target.once(event, handler)
  } else {
    target.on(event, handler)
  }
}

function remove (
  event: string,
  handler: Function,
  capture: boolean,
  _target?: HTMLElement
) {
  (_target || target).removeListener(event, handler)
}

function updateNodeListeners (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  target = vnode.elm
  updateListeners(on, oldOn, add, remove, vnode.context)
}

export default {
  create: updateNodeListeners,
  update: updateNodeListeners
}
