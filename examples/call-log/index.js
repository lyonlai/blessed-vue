import Vue from 'blessed-vue'
import LogComponent from './log.vue'
import store from './store'

const el = Vue.dom.createElement()

Vue.dom.append(el)

const instance = new Vue({
  name: 'app',
  components: {
    LogComponent
  },
  store,
  template: '<LogComponent />'
}).$mount(el)
