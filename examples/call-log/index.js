import Vue from 'blessed-vue'
import LogComponent from './log.vue'

const el = Vue.dom.createElement()

Vue.dom.append(el)

const instance = new Vue({
  name: 'app',
  components: {
    LogComponent
  },
  template: '<LogComponent />'
}).$mount(el)
