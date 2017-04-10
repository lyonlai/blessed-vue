/* @flow */
import { inBrowser } from 'core/util/env'
import { makeMap } from 'shared/util'

export const isReservedTag = makeMap('node', 'screen', 'element', 'box', 'text',
'line', 'scrollablebox', 'scrollabletext', 'bigtext', 'list', 'form', 'input',
'textarea', 'textbox', 'button', 'progressbar', 'filemanager', 'checkbox',
'radioset', 'radiobutton', 'prompt', 'question', 'message', 'loading',
'listbar', 'log', 'table', 'listtable', 'terminal', 'image', 'ansiimage',
'overlayimage', 'video', 'layout')

export const isPreTag = () => false

export const isUnaryTag = () => false

export const canBeLeftOpenTag = () => false

export const getTagNamespace = () => ''

export function isUnknownElement (tag: string): boolean {
  return inBrowser ? true : isReservedTag(tag)
}
