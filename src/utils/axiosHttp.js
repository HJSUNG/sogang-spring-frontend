import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_HOSTNAME_MANAGER_WAS,
  headers: {
    "Content-Type": "application/json",
    "Authorization": '',
  }
});

instance.interceptors.request.use(
  function(config) {
    // config.headers.Authorization = 'Bearer ' + TOKEN;
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