import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  mutations: {
    changeLogin(state,status){
      state.userInfo = status
    }
  },
  actions: {
    changeLogin({commit},status){
      commit('changeLogin',status)
    }
  }
})
