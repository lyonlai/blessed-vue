import Vue from 'blessed-vue'
import TestComponent from './test-component.vue'

const el = Vue.dom.createElement()

Vue.dom.append(el)

const instance = new Vue({
  name: 'app',
  components: {
    TestComponent
  },
  template: '<test-component />'
}).$mount(el)
