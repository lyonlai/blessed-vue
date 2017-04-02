/* @flow */
/* Fake dom */
const doc = {
  children: [],
  append (c) {
    this.children.push(c)
  },
  remove (c) {
    const index = this.children.indexOf(c)
    this.children.splice(index, 1)
  }
}

const child = {
  parent: doc
}

child.elm = child

doc.children.push(child)

export const dom = doc
