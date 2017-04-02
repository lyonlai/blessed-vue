/* @flow */
import blessed from 'blessed'
export { setAttribute } from 'node-blessed/util/attrs'
import { triggerRender } from 'node-blessed/runtime/util'

export function createElement (tagName: string, vnode: VNode) {
  const data = vnode.data || {}

  return blessed[tagName](Object.assign({ parent: vnode.elm }, data.attrs))
}

export function createElementNS (namespace: string, tagName: string) {
  return createElement(tagName)
}

export function createTextNode (text: string, options: Object = {}): Text {
  return blessed['text'](Object.assign({ content: text }, options))
}

export function createComment (text: string): Comment {
  return createTextNode(text, { hidden: true })
}

export function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode)
  triggerRender()
}

export function removeChild (node, child) {
  node.remove(child)
  triggerRender()
}

export function appendChild (node, child) {
  if (child instanceof blessed['Screen'] && !node.screen) {
    node.sceen = child
  }

  node.append(child)
  triggerRender()
}

export function parentNode (node) {
  return node.parent
}

export function nextSibling (node) {
  const siblings = node.parent.children
  const index = siblings.indexOf(node)
  const isLast = index === siblings.length - 1
  return isLast ? null : siblings[index + 1]
}

export function tagName (node): string {
  return node.type
}

export function setTextContent (node, text: string) {
  node.setContent(text)
  triggerRender()
}
