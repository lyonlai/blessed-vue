/* @flow */
import { throttle } from 'lodash'

function _refreshNode (node) {
  node.screen.render()
}

// limit the screen repaint rate to max 60fps
export const refreshNode = throttle(_refreshNode, 16)
