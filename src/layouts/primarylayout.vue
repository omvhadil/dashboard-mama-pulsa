<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "../components/sidebar.vue";
// import SidebarMobille from "../components/SidebarMobile.vue";
import { RouterView } from "vue-router";
import Header from "../components/Header.vue";
</script>

<template>
  <div class="wrapper overflow-y-hidden">
    <!-- <SidebarMobille /> -->
    <Sidebar />

    <div class="container-content">
      <Header />
      <div class="container p-3">
        <router-view v-slot="{ Component }">
          <transition name="slide-right">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <RouterView /> -->
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
@media (max-width: 768px) {
  .container-content {
    width: 100%;
    margin-left: 0;
  }
}
</style>
