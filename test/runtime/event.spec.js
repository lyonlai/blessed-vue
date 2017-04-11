import BlessedVue from '../../dist/build'
import { prepareBlessedForTest } from './util'

describe('generate events', () => {
  let screen, instance, el

  prepareBlessedForTest()

  beforeEach(() => {
    el = BlessedVue.dom.createElement()
  })

  afterEach(() => {
    BlessedVue.dom.remove(screen)
    screen.destroy()
  })

  it('should be bound and fire native event', done => {
    instance = new BlessedVue({
      template: `
        <screen :smartCSR="true">
          <button :keys="true" :mouse="true" @press="updateTitle" :top="10" :left="20" :width="50" :height="40" :content="title"/>
        </screen>
      `,
      data: {
        title: 'I am a button'
      },
      methods: {
        updateTitle () {
          this.title = 'now I am another button'
        }
      },
      mounted () {
        screen = this._vnode.elm
      }
    }).$mount(el)

    const [button] = screen.children

    button.emit('press')
    expect(instance.title).toEqual('now I am another button')

    BlessedVue.nextTick(() => {
      expect(button.content).toEqual('now I am another button')
      done()
    })
  })

  it('should be bound and fire custom event', done => {
    let innerButton
    const customComponent = {
      name: 'custom-component',
      template: `<button :keys="true" :mouse="true" @press="triggerEvent" :top="10" :left="20" :width="50" :height="40" content="title"/>`,
      methods: {
        triggerEvent () {
          this.$emit('random-event', 'Updating...')
        }
      },
      mounted () {
        innerButton = this._vnode.elm
      }
    }

    instance = new BlessedVue({
      template: `
        <screen>
          <text :top="0" :left="0" :width="50" :height="4" ref='text' :content='title' /><custom-component @random-event="updateContent" />
        </screen>
      `,
      data: {
        title: 'Update'
      },
      components: {
        customComponent
      },
      methods: {
        updateContent (content) {
          this.title = content
        }
      },
      mounted () {
        screen = this._vnode.elm
      }
    }).$mount(el)

    return BlessedVue.nextTick(() => {
      innerButton.emit('press')

      BlessedVue.nextTick(() => {
        expect(instance.$refs.text.content).toEqual('Updating...')
        done()
      })
    })
  })
})
