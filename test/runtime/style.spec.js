import BlessedVue from '../../dist/build'
import { prepareBlessedForTest } from './util'

describe('generate styles', () => {
  let screen, instance, el

  prepareBlessedForTest()

  beforeEach(() => {
    el = BlessedVue.dom.createElement()
  })

  afterEach(() => {
    BlessedVue.dom.remove(screen)
    screen.destroy()
  })

  it('should generate static style', done => {
    instance = new BlessedVue({
      template: `
        <screen :smartCSR="true">
          <box :top="10" :left="20" :width="50" :height="40" style="bg: red; fg: white; border.bg: blue; scrollbar.fg: #112233" :content="title"/>
        </screen>
      `,
      data: {
        title: 'my title'
      },
      mounted () {
        screen = this._vnode.elm
      }
    }).$mount(el)

    const [box] = screen.children

    BlessedVue.nextTick(() => {
      expect(box.style).toEqual(jasmine.objectContaining({
        bg: 'red',
        fg: 'white',
        border: {
          bg: 'blue'
        },
        scrollbar: {
          fg: '#112233'
        }
      }))
      done()
    })
  })

  it('should generate from array binding', done => {
    instance = new BlessedVue({
      template: `
        <screen :smartCSR="true">
          <text ref='text' :top="5" :left="10" :width="50" :height="4" :style="textStyle" content="some text"/>
          <button ref='btn' :keys="true" :mouse="true" :top="10" :left="20" :width="50" :height="10" :style="{ bg: bgColor }" content="update colors" @press="updateColors"/>
        </screen>
      `,
      data: {
        bgColor: 'white',
        textStyle: {
          fg: 'white',
          bold: true
        }
      },
      methods: {
        updateColors () {
          this.bgColor = 'yellow'
          this.textStyle = {
            fg: 'red',
            bold: false
          }
        }
      },
      mounted () {
        screen = this._vnode.elm
      }
    }).$mount(el)

    instance.$refs.btn.emit('press')

    BlessedVue.nextTick(() => {
      const { text, btn } = instance.$refs
      expect(text.style).toEqual(jasmine.objectContaining({
        fg: 'red',
        bold: false
      }))
      expect(btn.style).toEqual(jasmine.objectContaining({
        bg: 'yellow'
      }))
      done()
    })
  })
})
