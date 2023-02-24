<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAuthStore } from "../stores";
</script>
<template>
  <div class="row m-0 shadow-sm p-2">
    <div class="col-1 col-lg-1 fs-4">
      <i class="ri-align-justify"></i>
    </div>
    <div
      class="col-3 col-lg-2 d-flex align-items-center gap-1 p-1 text-dark ms-auto"
      style="cursor: pointer"
    >
      <i class="ri-shield-user-line"></i>{{ useAuthStore().user.name
      }}<i class="ri-arrow-drop-down-line"></i>
    </div>
  </div>
</template>
