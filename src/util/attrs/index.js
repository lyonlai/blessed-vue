/* @flow */
import { merge } from 'lodash'
export const mustUseProp = () => false

import { queueAttributeUpdate, shouldQueueAttributeUpdate } from './delayed-update-queue'

export { continueAttributeUpdateIfRequired } from './delayed-update-queue'

const selectQue = []

const RAW_ATTRIBUTES = new Set([

  // Alignment, Orientation & Presentation
  'align',
  'valign',
  'orientation',
  'shrink',
  'padding',
  'shadow',

  // Font-related
  'font',
  'fontBold',
  'fch',
  'ch',
  'bold',
  'underline',

  // Flags
  'clickable',
  'input',
  'keyable',
  'hidden',
  'visible',
  'scrollable',
  'draggable',
  'interactive',

  // Position
  'left',
  'right',
  'top',
  'bottom',
  'aleft',
  'aright',
  'atop',
  'abottom',

  // Size
  'width',
  'height',

  // Checkbox
  'checked',

  // Misc
  'name'
])

export function setAttribute (node, key: string, value: any) {
  if (shouldQueueAttributeUpdate(node)) {
    return queueAttributeUpdate(node, setAttribute, key, value)
  }

  if (key === 'selected' && node.select) {
    selectQue.push({
      node,
      value: (typeof value === 'string' ? +value : value)
    })
  } else if (key === 'label') { // Setting label
    node.setLabel(value)
  } else if (key === 'hoverText' && !value) { // Removing hoverText
    node.removeHover()
  } else if (key === 'hoverText' && value) { // Setting hoverText
    node.setHover(value)
  } else if (key === 'content') { // Setting content
    node.setContent(value)
  } else if (key === 'style') { // Updating style
    node.style = merge({}, node.style, value)
  } else if (key === 'items') { // Updating items
    node.setItems(value)
  } else if (key === 'border') { // Border edge case
    node.border = merge({}, node.border, value)
  } else if (key === 'value' && node.setValue) { // Textarea value
    node.setValue(value)
  } else if (key === 'filled' && node.filled !== value) { // Progress bar
    node.setProgress(value)
  } else if ((key === 'rows' || key === 'data') && node.setData) { // Table / ListTable rows / data
    node.setData(value)
  } else if (key === 'focused' && value && !node[key]) {
    node.focus()
  } else if (key === 'percent' && node.setPercent) {
    node.setPercent(value)
  } else if (key === 'stack' && node.setStack) {
    node.setStack(value)
  } else if (key === 'display' && node.setDisplay) {
    node.setDisplay(value)
  } else if (key === 'markdown' && node.setMarkdown) {
    node.setMarkdown(value)
  } else if (key === 'options' && node.setOptions) {
    node.setOptions(value)
  } else if (key === 'markers' && node.addMarker) {
    node.clearMarkers()

    value.forEach(val => node.addMarker(JSON.parse(JSON.stringify(val))))
  } else if (RAW_ATTRIBUTES.has(key)) { // Raw attributes
    node[key] = value
  }
}
