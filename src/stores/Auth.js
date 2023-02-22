// stores/counter.js
import { defineStore } from "pinia";
import { Api } from "../plugin/api";
import router from "../router"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userData: JSON.parse(localStorage.getItem("Auth") || null)
  }),
  getters: {
    getToken(){
        return this.userData?.access_token
    }
  },
  actions: {
    async PostLogin(data){
        await Api.post('/login', data).then((res) => {
            localStorage.setItem('Auth', JSON.stringify(res.data)),
            this.userData = res.data
            router.push("/")
        }).catch((error) => {
            alert(error)
        })
    }
  }
});
