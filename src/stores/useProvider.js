// stores/counter.js
import { defineStore } from "pinia";
import { inject } from "vue";
import { Api } from "../plugin/api";
import {isLoading} from "./Loader"

export const useProviderStore = defineStore("provider", {
  state: () => ({
    provider: [],
    isLoading: isLoading,
    progress: inject("progress")
  }),

  getters: {
    jmlProvider() {
      return this.provider.length
    }
  },

  actions: {
    // ======= get =======
    async getProvider() {
      this.progress.start();
      // this.isLoading = true;
      await Api.get("/provider").then((res) => {
        this.progress.finish()
        // this.isLoading = false;
        this.provider = res.data;
        // console.log(res.data);
      }).catch(() => {
        this.progress.fail()
        // this.isLoading = false;
      })
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
