import BlessedVue from '../../dist/build'
import blessed from 'blessed'
import { walk, prepareBlessedForTest } from './util'

describe('runtime tests', () => {
  let screen, el

  prepareBlessedForTest()

  beforeEach(() => {
    el = BlessedVue.dom.createElement()
  })

  afterEach(() => {
    BlessedVue.dom.remove(screen)
    screen.destroy()
  })

  describe('blessed dom should have correct structure', () => {
    let instance

    beforeAll(done => {
      instance = new BlessedVue({
        template: `
          <screen :smartCSR="true">
            <form ref="form" :keys="true" :mouse="true" @submit="login" top='center' left="center" width="50%" height="50%">
              <text top='1' left="50%" :width="15" :height="1" content="Login form" /><textbox :keys="true" :mouse="true" top='5' left="50%" :width="15" :height="5" :value="username" @submit="updateUsername" /><textbox :keys="true" :mouse="true" :censor="true" top='9' left="50%" :width="15" :height="5" :value="password" @submit="updatePassword" /><button content="Login" :keys="true" :mouse="true" :width="10" :height="4" @press="() => this.$refs.form.submit()" />
            </form>
          </screen>
        `,
        data: {
          username: '',
          password: ''
        },
        methods: {
          login () {},
          updateUsername (name) { this.username = name },
          updatePassword (password) { this.password = password }
        },
        mounted () {
          screen = this._vnode.elm
        }
      }).$mount(el)

      BlessedVue.nextTick(() => setTimeout(done, 20))
    })

    it('each node should match their tag type and initialised with attributes as options', () => {
      walk(instance._vnode, vnode => {
        const { elm, tag, data } = vnode
        expect(elm instanceof blessed[tag]).toEqual(true)
        expect(elm.options).toEqual(jasmine.objectContaining(data.attrs))
      })
    })

    it('blessed dom should have correct structure', () => {
      expect(screen.children.length).toEqual(1)

      const [form] = screen.children

      expect(form instanceof blessed.form).toEqual(true)

      expect(form.children.length).toEqual(4)

      const [text, username, password, loginButton] = form.children

      expect(text instanceof blessed.text).toEqual(true)

      expect(username instanceof blessed.textbox).toEqual(true)

      expect(password instanceof blessed.textbox).toEqual(true)

      expect(loginButton instanceof blessed.button).toEqual(true)
    })

    it('should call screen.render which repaint the screen', () => {
      expect(screen.render.calls.count()).toBeGreaterThan(1)
    })
  })
})
