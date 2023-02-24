// stores/counter.js
import { defineStore } from "pinia";
import { Api } from "../plugin/api";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userData: JSON.parse(localStorage.getItem("Auth") || null),
    user: {},
  }),
  getters: {
    getToken() {
      return this.userData?.access_token;
    },
  },
  actions: {
    // ====== Login =====
    async PostLogin(data) {
      await Api.post("/login", data)
        .then((res) => {
          // kita simpan/kirim responsenya ke local storage,
          // "JSON.stringify" fungsinya untuk merubah string javascript menjadi string JSON,
          // yang mana localStorage hanya menerima data string JSON.
          localStorage.setItem("Auth", JSON.stringify(res.data)),
            (this.userData = res.data);
          router.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    },
    async getUser() {
      await Api.get("/user").then((res) => {
        this.user = res.data;
      });
    },
  },
});
