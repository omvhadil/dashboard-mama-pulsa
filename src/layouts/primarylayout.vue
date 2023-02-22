<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "../components/sidebar.vue";
import SidebarMobille from "../components/SidebarMobile.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <SidebarMobille />
    <Sidebar />

    <div class="container-content mt-5 mt-xl-0">
      <div class="container p-3">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  min-height: 100%;
}
.container-content {
  width: calc(100% - 280px);
  margin-left: 280px;
}
@media (max-width: 992px) {
  .container-content {
    width: 100%;
    margin-left: 0;
  }
}
</style>
