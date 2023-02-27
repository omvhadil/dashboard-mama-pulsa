// stores/counter.js
import { defineStore } from "pinia";
import { Api } from "../plugin/api";
// import router from "../router";

export const useTransaksiStore = defineStore("transaksi", {
  state: () => ({
    allTransaksi: [],
    isLoading: false
  }),
  getters: {

  },
  actions: {
    // ========= get transaksi ====
    async getTransaksi() {
      this.isLoading = true
        await Api.get('/transaksi').then((res) => {
            this.allTransaksi = res.data
        })
    }
    
  },
});
