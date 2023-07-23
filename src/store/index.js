import { createStore } from 'vuex'
import accountManagement from "./account-management";
import publicData from './public-data'
export default createStore({
  state: {},
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    accountManagement,
    publicData
  }
})
