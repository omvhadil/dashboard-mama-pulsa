<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from "vue";
import { useProviderStore, useTransaksiStore } from "../stores";

onMounted(() => {
  useProviderStore().getProvider();
  useTransaksiStore().getTransaksi();
});
</script>

<template>
  <div>
    <!-- ==== Banner === -->
    <div data-aos="zoom-in" class="card text-bg-dark border-0">
      <img src="../assets/banner.png" class="card-img" alt="..." />
      <div class="card-img-overlay">
        <!-- <h3 class="card-title">Wellcome In Dashboard Mama Pulsa</h3>
        <p class="card-text w-50">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p class="card-text"><small>Last updated 3 mins ago</small></p> -->
      </div>
    </div>

    <div class="row p-3 gy-4 mt-2">
      <div data-aos="fade-down" class="col-lg-4 col-md-6 col-sm-12">
        <div class="shadow-lg rounded-3 overflow-hidden p-3 py-4">
          <div class="bg-white d-flex">
            <div class="text-dark">
              <h5 class="m-0">Transaksi</h5>
            </div>
            <div
              class="fs-3 text-success bg-success bg-opacity-25 d-flex align-items-center justify-content-center rounded-circle ms-auto"
              style="width: 40px; height: 40px"
            >
              <i class="ri-exchange-dollar-line"></i>
            </div>
          </div>
          <h2 class="text-dark">{{ useTransaksiStore().jmlTransaksi }}</h2>
        </div>
      </div>
      <div data-aos="fade-down" class="col-lg-4 col-md-6 col-sm-12">
        <div class="shadow-lg rounded-3 overflow-hidden p-3 py-4">
          <div class="bg-white d-flex">
            <div class="text-dark">
              <h5 class="m-0">Provider</h5>
            </div>
            <div
              class="fs-3 text-info bg-info bg-opacity-25 d-flex align-items-center justify-content-center rounded-circle ms-auto"
              style="width: 40px; height: 40px"
            >
              <i class="ri-shield-flash-line"></i>
            </div>
          </div>
          <h2 class="text-dark">{{ useProviderStore().jmlProvider }}</h2>
        </div>
      </div>
      <div data-aos="fade-down" class="col-lg-4 col-md-6 col-sm-12">
        <div class="shadow-lg rounded-3 overflow-hidden p-3 py-4">
          <div class="bg-white d-flex">
            <div class="text-dark">
              <h5 class="m-0">Users</h5>
            </div>
            <div
              class="fs-3 text-warning bg-warning bg-opacity-25 d-flex align-items-center justify-content-center rounded-circle ms-auto"
              style="width: 40px; height: 40px"
            >
              <i class="ri-creative-commons-by-line"></i>
            </div>
          </div>
          <h2 class="text-dark">0</h2>
        </div>
      </div>
    </div>
  </div>
</template>
