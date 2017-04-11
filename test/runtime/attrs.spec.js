import BlessedVue from '../../dist/build'
import { prepareBlessedForTest } from './util'

describe('generate attribute', () => {
  let screen, instance, el

  prepareBlessedForTest()

  beforeEach(() => {
    el = BlessedVue.dom.createElement()
  })

  afterEach(() => {
    BlessedVue.dom.remove(screen)
    screen.destroy()
  })

  it('should create options && attributes', () => {
    instance = new BlessedVue({
      template: `
        <screen :smartCSR="true">
          <box :top="10" :left="20" :width="50" :height="40" :content="title"/>
        </screen>
      `,
      data: {
        title: 'my title'
      },
      mounted () {
        screen = this._vnode.elm
      }
    }).$mount(el)

    const [boxVnode] = instance._vnode.children

    const boxAttrs = boxVnode.data.attrs

    const expectedAttrs = {
      top: 10,
      left: 20,
      width: 50,
      height: 40,
      content: 'my title'
    }

    expect(boxAttrs).toEqual(jasmine.objectContaining(expectedAttrs))

    const boxEl = boxVnode.elm

    expect(boxEl.options).toEqual(jasmine.objectContaining(expectedAttrs))

    expect(boxEl.top).toEqual(10)
    expect(boxEl.left).toEqual(20)
    expect(boxEl.width).toEqual(50)
    expect(boxEl.height).toEqual(40)
    expect(boxEl.content).toEqual('my title')
  })

  it('should update attributes', done => {
    instance = new BlessedVue({
      template: `
        <screen :smartCSR="true">
          <box :top="10" :left="20" :width="width" :height="40" :content="title"/>
        </screen>
      `,
      data: {
        width: 60,
        title: 'my title'
      },
      mounted () {
        screen = this._vnode.elm
      }
    }).$mount(el)

    const currentCallCount = screen.render.calls.count()

    instance.width = 80
    instance.title = 'new title'

    return BlessedVue.nextTick(() => {
      const [boxVnode] = instance._vnode.children

      const boxAttrs = boxVnode.data.attrs

      const expectedAttrs = {
        top: 10,
        left: 20,
        width: 80,
        height: 40,
        content: 'new title'
      }

      expect(boxAttrs).toEqual(jasmine.objectContaining(expectedAttrs))

      const boxEl = boxVnode.elm

      expect(boxEl.top).toEqual(10)
      expect(boxEl.left).toEqual(20)
      expect(boxEl.width).toEqual(80)
      expect(boxEl.height).toEqual(40)
      expect(boxEl.content).toEqual('new title')

      setTimeout(() => {
        expect(screen.render.calls.count()).toBeGreaterThan(currentCallCount)
        done()
      }, 20)
    })
  })

  it('should clear attribute', done => {
    instance = new BlessedVue({
      template: `
        <screen :smartCSR="true">
          <box :top="10" :left="20" :width="width" :height="40" :content="title"/>
        </screen>
      `,
      data: {
        width: 60,
        title: 'my title'
      },
      mounted () {
        screen = this._vnode.elm
      }
    }).$mount(el)

    const currentCallCount = screen.render.calls.count()

    instance.title = null

    return BlessedVue.nextTick(() => {
      const [boxVnode] = instance._vnode.children

      const boxAttrs = boxVnode.data.attrs

      expect(boxAttrs.title).toEqual(undefined)

      const boxEl = boxVnode.elm

      expect(boxEl.content).toEqual('')

      setTimeout(() => {
        expect(screen.render.calls.count()).toBeGreaterThan(currentCallCount)
        done()
      }, 20)
    })
  })
})
