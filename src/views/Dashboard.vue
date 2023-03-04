<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from "vue";
import { useAuthStore, useProviderStore, useTransaksiStore } from "../stores";

onMounted(() => {
  useProviderStore().getProvider();
  useTransaksiStore().getTransaksi();
});
</script>
<template>
  <div>
    <h3 class="text-success m-0">Dashboard</h3>
    <span class="text-small text-success"
      >Hai {{ useAuthStore().user.name }}, Wellcome In Dashboard</span
    >
    <div class="row p-3 gy-4 mt-2">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="shadow rounded-3">
          <div class="bg-white p-3 d-flex">
            <div class="fs-1 text-dark">
              <i class="ri-shield-flash-line"></i>
            </div>
            <div class="ms-auto text-dark">
              <h3 class="m-0">{{ useTransaksiStore().jmlTransaksi }}</h3>
              <p>Transaksi</p>
            </div>
          </div>
          <div class="bg-info-subtle text-info text-small p-1 text-center">
            Total Transaksi
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="shadow rounded-3">
          <div class="bg-white p-3 d-flex">
            <div class="fs-1 text-dark">
              <i class="ri-shield-check-line"></i>
            </div>
            <div class="ms-auto text-dark">
              <h3 class="m-0">{{ useProviderStore().jmlProvider }}</h3>
              <p>Provider</p>
            </div>
          </div>
          <div
            class="bg-success-subtle text-small p-1 text-center text-success"
          >
            Total Provider
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="shadow rounded-3">
          <div class="bg-white p-3 d-flex">
            <div class="fs-1 text-dark">
              <i class="ri-shield-user-line"></i>
            </div>
            <div class="ms-auto text-dark">
              <h3 class="m-0">0</h3>
              <p>Admin</p>
            </div>
          </div>
          <div
            class="bg-warning-subtle text-small p-1 text-center text-warning"
          >
            Total Admin
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
