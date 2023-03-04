import axios from "axios";
import route from "../router"
import { useAuthStore }from "../stores"


export const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

Api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = useAuthStore().getToken
      // this.$progress.start()
      return config;
},
    (error) => {
      return Promise.reject(error);
});

Api.interceptors.response.use(
  (response) => {
  return response;
},
  (error) => {
    switch(error.response.status){
      case 401:
      route.push('/');
      break;
      default:
        alert("ada kesalahan")
    }
  return Promise.reject(error);
});
