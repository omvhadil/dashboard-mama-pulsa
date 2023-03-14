<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "../components/sidebar.vue";
import { RouterView } from "vue-router";
import Header from "../components/Header.vue";
</script>

<template>
  <Header />
  <div class="wrapper overflow-y-hidden">
    <Sidebar />

    <div class="container-content">
      <div class="container p-3">
        <!-- <router-view v-slot="{ Component }">
          <transition name="slide-right">
            <component :is="Component" />
          </transition>
        </router-view> -->
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
  padding: 5rem 0 5rem 0;
  width: calc(100% - 250px);
  margin-left: 250px;
}
@media (max-width: 768px) {
  .container-content {
    width: 100%;
    margin-left: 0;
  }
}
</style>
