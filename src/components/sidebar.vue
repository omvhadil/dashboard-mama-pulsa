<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from "vue-router";
import { dataMenu } from "../constans";
import { useAuthStore } from "../stores";
</script>
<template>
  <nav class="navbar-vertical-nav d-none d-md-block position-fixed">
    <div class="navbar-vertical bg-white border-end">
      <div class="p-3">
        <a
          href="#"
          class="navbar-brand fs-4 fw-bold text-dark d-flex align-items-center"
        >
          <i class="ri-git-repository-line text-success fs-3 me-2"></i>Mama
          Pulsa</a
        >
      </div>
      <div class="navbar-vartical-content mt-3">
        <ul class="navbar-nav flex-column px-3 row-gap-1">
          <div v-for="(item, index) in dataMenu" :key="index">
            <h6>{{ item.title }}</h6>
            <li class="nav-item">
              <RouterLink
                v-for="(items, idx) in dataMenu[index].menus"
                :key="idx"
                :to="items.path"
                exact-active-class="bg-success-subtle bg-opacity-25 text-success-emphasis"
                class="nav-link p-2 d-flex align-items-center rounded"
                ><i class="me-2" :class="items.icon"></i
                >{{ items.menu }}</RouterLink
              >
            </li>
          </div>
          <button
            @click="useAuthStore().logout()"
            class="nav-link p-2 d-flex align-items-center rounded border-0 bg-white"
          >
            <i class="ri-login-box-line me-2"></i>
            Log Out
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar-vertical-nav {
  width: 280px;
}
.navbar-vertical {
  height: 100vh;
}
.actived {
  background-color: #ceefce;
  color: #044504 !important;
  font-weight: 400;
}
</style>
