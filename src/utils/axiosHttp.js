import axios from "axios";

import store from '@/store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_HOSTNAME_MANAGER_WAS,
  headers: {
    "Content-Type": "application/json",
    "Authorization": '',
  }
});

instance.interceptors.request.use(
  function(config) {
    const token = store.getters['login/userInfo'].accessToken;
    config.headers.Authorization = 'Bearer ' + token;
    return config
  },
  function(error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;