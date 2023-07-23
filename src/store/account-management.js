import storage from "@/utils/storage";
export default {
  state: () => ({
    userinfo: {},
  }),
  getters: {},
  mutations: {
    setUserInfo(state, payload) {
      state.userinfo = payload;
      storage.setStorage("userinfo", payload);
    }
  },
  actions: {},
  namespaced: true
};
