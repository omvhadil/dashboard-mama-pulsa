// stores/counter.js
import { defineStore } from "pinia";
import { Api } from "../plugin/api";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userData: JSON.parse(localStorage.getItem("Auth") || null),
    user: {},
    isLoading: false,
  }),
  getters: {
    getToken() {
      return this.userData?.access_token;
    },
  },
  actions: {
    // ====== Login =====
    async PostLogin(data) {
      this.isLoading = true,
      await Api.post("/login", data)
        .then((res) => {
          // kita simpan/kirim responsenya ke local storage,
          // "JSON.stringify" fungsinya untuk merubah string javascript menjadi string JSON,
          // yang mana localStorage hanya menerima data string JSON.
          localStorage.setItem("Auth", JSON.stringify(res.data)),
          this.userData = res.data;
          router.push("/dashboard");
          this.isLoading = false
        })
        .catch((error) => {
          alert(error);
        });
    },
    // ====== Get User =====
    async getUser() {
      await Api.get("/user").then((res) => {
        this.user = res.data;
      });
    },
    // ======= Log Out =====
    logout(){
      localStorage.removeItem('Auth')
      this.userData = null;
      router.push("/")
    }
  },
});
