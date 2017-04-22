/* @flow */
import { inBrowser } from 'core/util/env'
import { makeMap } from 'shared/util'
import contrib from 'blessed-contrib'
import { intersection } from 'lodash'

export const isReservedTag = tag => isBlessedTag(tag) || isContribTag(tag)

const prepareMakeMap = (arr: Array): string => arr.join(',')

const blessedTags = [
  'node', 'screen', 'element', 'box', 'text',
  'line', 'scrollablebox', 'scrollabletext', 'bigtext', 'list', 'form', 'input',
  'textarea', 'textbox', 'button', 'progressbar', 'filemanager', 'checkbox',
  'radioset', 'radiobutton', 'prompt', 'question', 'message', 'loading',
  'listbar', 'log', 'table', 'listtable', 'terminal', 'image', 'ansiimage',
  'overlayimage', 'video', 'layout'
]

export const isBlessedTag = makeMap(prepareMakeMap(blessedTags))

const contribTags = [
  'line', 'bar', 'stacked-bar', 'map', 'gauge',
  'donut', 'lcd', 'log', 'picture', 'sparkline', 'table', 'tree', 'markdown'
]

export const isContribTag = makeMap(prepareMakeMap(contribTags))

export const isOverlappingTags = makeMap(prepareMakeMap(intersection(blessedTags, contribTags)))

export const isPreTag = () => false

export const isUnaryTag = () => false

export const canBeLeftOpenTag = () => false

export const getTagNamespace = () => ''

export const isContribElement = node => node.type && contrib[node.type] && node instanceof contrib[node.type]

export function isUnknownElement (tag: string): boolean {
  return inBrowser ? true : !isReservedTag(tag)
}
