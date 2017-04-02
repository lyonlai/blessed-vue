/* @flow */
import blessed from 'blessed'

export function getScreen (index: Int = 0) {
  return blessed.screen.instances[index]
}

export function triggerRender () {
  const screen = getScreen()

  if (screen) {
    screen.render()
  }
}
