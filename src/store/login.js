export default {
  namespaced:true,
  state: {
    accessToken: '',
    USER_ID: '',
    USER_NM: '',
    USER_TP: '',
  },
  getters: {
    userInfo(state) {
      return {"USER_ID": state.USER_ID,"USER_NM": state.USER_NM, "USER_TP": state.USER_TP, "accessToken":state.accessToken}
    }
  },
  mutations: {
    login(state,payload) {
      state.accessToken = payload.accessToken;
      state.USER_ID = payload.USER_ID;
      state.USER_NM = payload.USER_NM;
      state.USER_TP = payload.USER_TP;
      console.log("@@@ login success")
    },
    logout(state, payload) {
      state.accessToken = "";
      state.USER_ID = "";
      state.USER_NM = "";
      state.USER_TP = "";
      console.log("@@@ logout success")

    }
  }
}