<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { isLoading } from "../stores";
</script>
<template>
  <div
    v-if="isLoading"
    style="height: 100vh; width: 100%"
    class="bg-dark position-absolute top-0 bg-opacity-50 d-flex align-items-center justify-content-center overflow-hidden"
  >
    <div class="d-flex align-items-center justify-content-center">
      <div class="spinner-border text-white" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
