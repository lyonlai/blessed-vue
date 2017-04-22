import Vue from 'blessed-vue'
import Dashboard from './dashboard.vue'

const el = Vue.dom.createElement()

Vue.dom.append(el)

const instance = new Vue({
  name: 'app',
  components: {
    Dashboard
  },
  template: '<dashboard />'
}).$mount(el)
