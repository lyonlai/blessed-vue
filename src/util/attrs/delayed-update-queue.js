import { isContribElement } from '../element'
const queue = new Map()

/*
  The purpose of this module is to queue up the attribute update for blessed-contrib
  element and flush them out after the element has been attached to the screen.
*/

export function queueAttributeUpdate (node, fn, ...args) {
  let queueForNode = queue.get(node)
  if (!queueForNode) {
    queueForNode = []
    queue.set(node, queueForNode)
  }

  queueForNode.push([fn, [node, ...args]])
}

export function continueAttributeUpdateIfRequired (node) {
  return isContribElement(node) && continueAttributeUpdate(node)
}

export function continueAttributeUpdate (node) {
  const queueForNode = queue.get(node)

  if (!queueForNode) {
    return
  }

  queueForNode.forEach(([fn, args]) => fn(...args))

  queue.delete(node)
}

export function shouldQueueAttributeUpdate (node) {
  const hasNotBeenAppended = !node.ctx
  const isContrib = isContribElement(node)
  return isContrib && hasNotBeenAppended
}
