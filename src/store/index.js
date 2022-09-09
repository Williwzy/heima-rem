import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const ROKEN_KEY = 'TOUTAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(ROKEN_KEY)
  },
  getters: {},
  mutations: {
    getUser (state, data) {
      state.user = data
      setItem(ROKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
