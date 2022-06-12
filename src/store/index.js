import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server_api: 'http://localhost:8000',
    server_socket: 'http://localhost:8002'
  },
  getters: {
    SERVER_API: state => {
      return state.server_api;
    },
    SERVER_SOCKET: state => {
      return state.server_socket
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
