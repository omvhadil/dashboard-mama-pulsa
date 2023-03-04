// stores/counter.js
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { Api } from "../plugin/api";
import router from "../router";
import {isLoading} from "./Loader"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userData: JSON.parse(localStorage.getItem("Auth") || null),
    user: {},
    isLoading: isLoading,
  }),
  getters: {
    getToken() {
      return this.userData?.access_token;
    },
  },
  actions: {
    // ====== Login =====
    async PostLogin(senddata) {
      // this.isLoading = true,
      await Api.post("/login", senddata)
        .then((res) => {
          // kita simpan/kirim responsenya ke local storage,
          // "JSON.stringify" fungsinya untuk merubah string javascript menjadi string JSON,
          // yang mana localStorage hanya menerima data string JSON.
          localStorage.setItem("Auth", JSON.stringify(res.data)),
          this.userData = res.data;
          router.push("/dashboard");
          // this.isLoading = false
        })
        .catch(() => {
          // this.isLoading = false
          alert("Email or Password is wrong");
        });
    },
    // ====== Get User =====
    async getUser() {
      // this.isLoading = true
      await Api.get("/user").then((res) => {
        // this.isLoading = false
        this.user = res.data;
      });
    },
    // ======= Log Out =====
    logout(){
      Swal.fire({
        title: 'Apakah kamu yakin?',
        text: "kamu akan keluar dari aplikasi ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya, Keluar!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('Auth')
          this.userData = null;
          router.push("/")
        }
      })
    }
  },
});
