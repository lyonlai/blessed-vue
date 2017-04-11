import blessed from 'blessed'

export const walk = (node, cb) => {
  if (!node.children || node.children.length < 0) {
    return
  }

  cb(node)

  node.children.forEach(c => walk(c, cb))
}

export function prepareBlessedForTest () {
  beforeAll(() => {
    spyOn(blessed.screen.prototype, 'render').and.stub()
  })
}
