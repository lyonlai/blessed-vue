/* @flow */
import blessed from 'blessed'
export { setAttribute } from 'node-blessed/util/attrs'

export function createElement (tagName: string, options: Object = {}) {
  return blessed[tagName](options)
}

export function createElementNS (namespace: string, tagName: string) {
  return createElement(tagName)
}

export function createTextNode (text: string, options: Object = {}): Text {
  return createElement('text', Object.assign({ content: text }, options))
}

export function createComment (text: string): Comment {
  return createTextNode(text, { hidden: true })
}

export function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode)
}

export function removeChild (node, child) {
  node.remove(child)
}

export function appendChild (node, child) {
  node.append(child)
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
}
