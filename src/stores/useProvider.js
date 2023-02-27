// stores/counter.js
import { defineStore } from "pinia";
import { Api } from "../plugin/api";

export const useProviderStore = defineStore("provider", {
  state: () => ({
    provider: [],
    isLoading: true
  }),

  getters: {
    jmlProvider() {
      return this.provider.length
    }
  },

  actions: {
    // ======= get =======
    async getProvider() {
      this.isLoading = true
      await Api.get("/provider").then((res) => {
        this.isLoading = false;
        this.provider = res.data;
        // console.log(res.data);
      });
    },
    // ======== delete =======
    async delProvider(id) {
      await Api.delete("/provider/" + id).then(() => {
        this.getProvider();
      });
    },
    // ======== post =======
    async PostProvider(data) {
      await Api.post("/provider/", data);
    },
    // ======== Put show =======
    async showProvider(id) {
      return await Api.get("/provider/" + id);
    },
    // ======== Put =======
    async PutProvider(id, data) {
      await Api.put("/provider/"+ id, data)
    },
  },
});
