/* @flow */

import { cached } from 'shared/util'
import { merge, set } from 'lodash'

export const parseStyleText = cached(function (cssText) {
  const res = {}
  const listDelimiter = ';'
  const propertyDelimiter = ':'
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter)
      if (tmp.length > 1) {
        const [name, val] = tmp
        set(res, name, val)
      }
    }
  })
  return res
})

export function transformStaticStyle (staticStyle) {
  Object.keys(staticStyle).forEach(key => {
    if (key.indexOf('.') > 0) {
      const val = staticStyle[key]
      delete staticStyle[key]
      set(staticStyle, key, val)
    }
  })

  return staticStyle
}

// normalize possible array / string values into Object
export function normalizeStyleBinding (bindingStyle: any): ?Object {
  if (Array.isArray(bindingStyle)) {
    return merge({}, ...bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}
