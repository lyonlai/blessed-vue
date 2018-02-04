/* @flow */
import blessed from 'blessed'
import contrib from 'blessed-contrib'
export { setAttribute } from 'util/attrs/index'
import {
  continueAttributeUpdateIfRequired,
  isOverlappingTags,
  isBlessedTag
} from 'util/index'
import { refreshNode } from './util'
import { transformStaticStyle, normalizeStyleBinding } from 'util/style'

export function createElement (tagName: string, vnode: VNode) {
  const isBlessed = isOverlappingTags(tagName)
    ? vnode.data.attrs.blessed === true
    : isBlessedTag(tagName)
  const ctor = isBlessed ? blessed : contrib
  const data = vnode.data || {}
  const { staticStyle, style, attrs } = data
  const el = ctor[tagName](
    Object.assign({ parent: vnode.elm }, attrs, {
      style: staticStyle
        ? transformStaticStyle(staticStyle)
        : normalizeStyleBinding(style)
    })
  )
  el.elm = el

  return el
}

export function createElementNS (namespace: string, tagName: string) {
  return createElement(tagName)
}

export function createTextNode (text: string, options: Object = {}): Text {
  return blessed['text'](
    Object.assign({ content: text, hidden: text.trim() === '' }, options)
  )
}

export function createComment (text: string): Comment {
  return createTextNode(text, { hidden: true })
}

export function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode)
  newNode.parentNode = parentNode
  continueAttributeUpdateIfRequired(newNode)
  refreshNode(parentNode)
}

export function removeChild (node, child) {
  child.destroy()
  node.remove(child)
  refreshNode(node)
}

export function appendChild (node, child) {
  node.append(child)
  child.parentNode = node
  continueAttributeUpdateIfRequired(child)
  refreshNode(node)
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
  refreshNode(node)
}
