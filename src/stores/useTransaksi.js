// stores/counter.js
import { defineStore } from "pinia";
import { inject } from "vue";
import { Api } from "../plugin/api";
import { isLoading } from "./Loader"
// import { Textsearch } from "../stores/search.js"

export const useTransaksiStore = defineStore("transaksi", {
  state: () => ({
    allTransaksi: {},
    isLoading: isLoading,
    progress: inject("progress"),
    page: 1,
  }),
  getters: {
    jmlTransaksi() {
      return this.allTransaksi.total_data
    }
  },
  actions: {
    // ========= get transaksi ====
    async getTransaksi(query) {
      this.$state.progress.start();
        await Api.get('/transaksi', {
          params: {
            ...query
          }
        }).then((res) => {
            this.allTransaksi = res.data
            this.progress.finish()
        })
    },
    // ========= delete transaksi ====
    async delTransaksi(id) {
      await Api.delete('/transaksi/' + id).then(() => {
        this.getTransaksi()
      })
    },
    // ========= post transaksi ====
    async postTransaksi(form) {
      await Api.post('/transaksi', {
        provider_id: form.provider_id,
        no_hp: form.no_hp,
        nominal: form.nominal,
        status: "pending",
        catatan: form.catatan,
      })
    },
    // ========= show transaksi ====
    async showTransaksi(id) {
      return await Api.get('/transaksi/' + id)
    },
    // ========= put transaksi ====
    async putTransaksi(id, data) {
      await Api.put('/transaksi/' + id, data)
  },
}
});
