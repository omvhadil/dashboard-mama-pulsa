<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from "vue";
import { useAuthStore, useProviderStore } from "../stores";

onMounted(() => {
  useAuthStore().getUser();
  useProviderStore().getProvider();
});
</script>
<template>
  <h3 class="text-success m-0">Dashboard</h3>
  <P class="text-small text-success"
    >Hai {{ useAuthStore().user.name }}, Wellcome In Dashboard</P
  >

  <div class="row p-3 gy-4">
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="bg-info p-3 d-flex">
        <div class="fs-1 text-white"><i class="ri-shield-flash-line"></i></div>
        <div class="ms-auto text-white">
          <h3 class="m-0">0</h3>
          <p>Transaksi</p>
        </div>
      </div>
      <div class="bg-info opacity-75 text-small p-1 text-center text-white">
        Total Transaksi
      </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="bg-success p-3 d-flex">
        <div class="fs-1 text-white"><i class="ri-shield-check-line"></i></div>
        <div class="ms-auto text-white">
          <h3 class="m-0">{{ useProviderStore().jmlProvider }}</h3>
          <p>Provider</p>
        </div>
      </div>
      <div class="bg-success opacity-75 text-small p-1 text-center text-white">
        Total Provider
      </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="bg-warning p-3 d-flex">
        <div class="fs-1 text-white"><i class="ri-shield-user-line"></i></div>
        <div class="ms-auto text-white">
          <h3 class="m-0">0</h3>
          <p>Admin</p>
        </div>
      </div>
      <div class="bg-warning opacity-75 text-small p-1 text-center text-white">
        Total Admin
      </div>
    </div>
  </div>
</template>
