export default {
  namespaced:true,
  state: {
    accessToken: '',
    USER_ID: '',
    USER_NM: '',
    USER_TP: '',
    USER_GENDER:'',
    USER_BIRTH_DT: '',
    USER_ADDR: '',
    USER_EMAIL_ADDR: '',
  },
  getters: {
    userInfo(state) {
      return {
        "USER_ID": state.USER_ID,
        "USER_NM": state.USER_NM,
        "USER_TP": state.USER_TP,
        "USER_GENDER":state.USER_GENDER,
        "USER_BIRTH_DT":state.USER_BIRTH_DT,
        "USER_ADDR": state.USER_ADDR,
        "USER_EMAIL_ADDR": state.USER_EMAIL_ADDR,
        "accessToken":state.accessToken
      }
    }
  },
  mutations: {
    login(state,payload) {
      state.accessToken = payload.accessToken;
      state.USER_ID = payload.USER_ID;
      state.USER_NM = payload.USER_NM;
      state.USER_TP = payload.USER_TP;
      state.USER_GENDER = payload.USER_GENDER;
      state.USER_BIRTH_DT = payload.USER_BIRTH_DT;
      state.USER_ADDR = payload.USER_ADDR;
      state.USER_EMAIL_ADDR = payload.USER_EMAIL_ADDR;
      console.log("@@@ login success")
    },
    logout(state, payload) {
      state.accessToken = "";
      state.USER_ID = "";
      state.USER_NM = "";
      state.USER_TP = "";
      state.USER_GENDER = "";
      state.USER_BIRTH_DT = "";
      state.USER_ADDR = "";
      state.USER_EMAIL_ADDR = "";
      console.log("@@@ logout success")

    }
  }
}