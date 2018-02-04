/* @flow */
/*
  Reason why this is here: There's no window.document equivalent in blessed,
  This is here to accomondaet the mount on element situation.

  Both the DOM and PlaceboELement are only here to simulate the behavior of web
  dom.
*/
export class BlessedDOM {
  constructor () {
    this.children = []
    this._events = {}
    this.type = 'root-dom'
  }

  append (c) {
    if (c.program) {
      this.screen = c
    }
    c.parent = this
    this.children.push(c)
  }

  remove (c) {
    const index = this.children.indexOf(c)
    this.children.splice(index, 1)
  }

  createElement () {
    return new BlessedPlaceboElement(this)
  }
}

export class BlessedPlaceboElement {
  constructor (parent) {
    this.parent = parent
    this.elm = this
    this.type = 'placebo'
  }

  destroy () {}
}

export const dom = new BlessedDOM()
