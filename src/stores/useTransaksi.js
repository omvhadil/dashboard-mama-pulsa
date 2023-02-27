// stores/counter.js
import { defineStore } from "pinia";
import { Api } from "../plugin/api";
import { isLoading } from "./Loader"
// import router from "../router";

export const useTransaksiStore = defineStore("transaksi", {
  state: () => ({
    allTransaksi: [],
    isLoading: isLoading
  }),
  getters: {

  },
  actions: {
    // ========= get transaksi ====
    async getTransaksi() {
      this.isLoading = true
        await Api.get('/transaksi').then((res) => {
            this.allTransaksi = res.data
            this.isLoading = false
        })
    }
    
  },
});
