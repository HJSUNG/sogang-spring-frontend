import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import login from "@/store/login";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {login,},
  plugins:[],
});
