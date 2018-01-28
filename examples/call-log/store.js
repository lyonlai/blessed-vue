import BlessedVue from 'blessed-vue'
import Vuex from 'vuex'

BlessedVue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  logs: ''
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  appendLog (state, message) {
    state.logs += `\n\n${message}`
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  appendLog: ({ commit }, message) => commit('appendLog', message)
}

// getters are functions
const getters = {}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
