// stores/counter.js
import { defineStore } from "pinia";
import { Api } from "../plugin/api";

export const useProviderStore = defineStore("provider", {
  state: () => ({
    provider: [],
    providerId: {},
  }),
  actions: {
    // ======= get =======
    async getProvider() {
      await Api.get("/provider").then((res) => {
        this.provider = res.data;
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
      await Api.post("/provider/", data).then(() => {
        this.getProvider();
        alert("data berhasil ditambah");
      });
    },
    // ======== Put show =======
    async showProvider(id) {
      await Api.get("/provider/" + id).then((data) => {
        this.providerId = data;
      });
    },
    // ======== Put =======
    async PutProvider(data) {
      await Api.put("/provider/", data).then(() => {
        this.getProvider();
        alert("data berhasil ditambah");
      });
    },
  },
});