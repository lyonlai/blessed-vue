import BlessedVue from '../../dist/build'
import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { prepareBlessedForTest } from './util'

describe('contrib tests', () => {
  describe('element', () => {
    let instance

    let screen, el

    prepareBlessedForTest()

    beforeEach(() => {
      el = BlessedVue.dom.createElement()
    })

    afterEach(() => {
      BlessedVue.dom.remove(screen)
      screen.destroy()
    })

    beforeAll(done => {
      spyOn(contrib.line.prototype, 'setData')
      spyOn(contrib.line.prototype, 'setLabel')
      spyOn(contrib.gauge.prototype, 'setPercent')
      spyOn(contrib.gauge.prototype, 'setLabel')
      spyOn(contrib.map.prototype, 'addMarker')
      instance = new BlessedVue({
        template: `
          <screen :smartCSR="true">
            <line :data="downloadSpeed" label="Speed"/>
            <gauge :percent="percentage" label="Downloaded" />
            <table :blessed="true" :data="downloaded"/>
          </screen>
        `,
        data () {
          return {
            percentage: '90',
            downloadSpeed: {
              x: ['t1', 't2', 't3', 't4', 't5', 't6'],
              y: [50, 10, 72, 53, 25, 46]
            },
            downloaded: [
              ['File name', 'Location'],
              ['data.zip', '~/Downloads'],
              ['Sourcetree.zip', '~Downloads/App']
            ]
          }
        },
        mounted () {
          screen = this._vnode.elm
        }
      }).$mount(el)

      BlessedVue.nextTick(() => setTimeout(done, 20))
    })

    it('should be able to render overlapped tag from contrib is blessed is not specified', () => {
      const [line] = screen.children

      expect(line instanceof contrib.line).toEqual(true)
      expect(line.setData).toHaveBeenCalledWith(instance.downloadSpeed)
      expect(line.setLabel).toHaveBeenCalledWith('Speed')
    })

    it('should be able to render non overlapping tag from contrib', () => {
      const [,, gauge] = screen.children

      expect(gauge instanceof contrib.gauge).toEqual(true)
      expect(gauge.setPercent).toHaveBeenCalledWith('90')
      expect(gauge.setLabel).toHaveBeenCalledWith('Downloaded')
    })

    it('shoudl be able to render blessed element on overlapping tags when specified :blessed="true"', () => {
      const [,,,, table] = screen.children

      expect(table instanceof blessed.table).toEqual(true)
      expect(table.rows).toEqual(instance.downloaded)
    })
  })

  describe('attributes', () => {
    let instance

    let screen, el

    prepareBlessedForTest()

    beforeEach(() => {
      el = BlessedVue.dom.createElement()
    })

    afterEach(() => {
      BlessedVue.dom.remove(screen)
      screen.destroy()
    })

    beforeAll(done => {
      spyOn(contrib.gauge.prototype, 'setStack')
      spyOn(contrib.map.prototype, 'clearMarkers')
      spyOn(contrib.map.prototype, 'addMarker')
      spyOn(contrib.lcd.prototype, 'setDisplay')
      spyOn(contrib.lcd.prototype, 'setOptions')
      spyOn(contrib.markdown.prototype, 'setMarkdown')
      instance = new BlessedVue({
        template: `
          <screen :smartCSR="true">
            <map :markers="markers" />
            <gauge :stack="stack" />
            <lcd :display="display" :options="options"/>
            <markdown :markdown="markdown"/>
          </screen>
        `,
        data () {
          return {
            markers: [
              {
                lon: '-37.90',
                lat: '65.90',
                color: 'red',
                char: 'X'
              }
            ],
            stack: [
              30,
              30,
              40
            ],
            display: '330',
            options: {
              segmentInterval: 0.11,
              strokeWidth: 0.11,
              elements: 4
            },
            markdown: `
              # Title
              *Today* is a good day
            `
          }
        },
        mounted () {
          screen = this._vnode.elm
        }
      }).$mount(el)

      BlessedVue.nextTick(() => setTimeout(done, 20))
    })

    it('should call addMarker for map', () => {
      const [map] = screen.children
      expect(map instanceof contrib.map).toEqual(true)
      expect(map.addMarker).toHaveBeenCalledWith(instance.markers[0])
      expect(map.clearMarkers).toHaveBeenCalled()
    })

    it('should call setStack for stacked gauge', () => {
      const [,, gauge] = screen.children
      expect(gauge instanceof contrib.gauge).toEqual(true)
      expect(gauge.setStack).toHaveBeenCalledWith(instance.stack)
    })

    it('should call setDisplay for lcd', () => {
      const [,,,, lcd] = screen.children
      expect(lcd instanceof contrib.lcd).toEqual(true)
      expect(lcd.setDisplay).toHaveBeenCalledWith(instance.display)
      expect(lcd.setOptions).toHaveBeenCalledWith(instance.options)
    })

    it('should call setMarkdown for markdown', () => {
      const [,,,,,, markdown] = screen.children
      expect(markdown instanceof contrib.markdown).toEqual(true)
      expect(markdown.setMarkdown).toHaveBeenCalledWith(instance.markdown)
    })
  })
})
