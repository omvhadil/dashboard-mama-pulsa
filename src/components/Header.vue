<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAuthStore } from "../stores";
import { dataMenu } from "../constans";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";

onMounted(() => {
  useAuthStore().getUser();
});
</script>
<template>
  <div class="row m-0 shadow-sm p-2">
    <div class="col-1 fs-4 d-lg-none">
      <button
        class="border-0 bg-white"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <i class="ri-align-justify"></i>
      </button>
    </div>
    <div
      class="col-7 col-lg-5 d-flex align-items-center gap-1 p-1 text-dark ms-auto"
      style="cursor: pointer"
    >
      <i class="ri-shield-user-line ms-auto"></i>{{ useAuthStore().user.name
      }}<i class="ri-arrow-drop-down-line"></i>
    </div>
  </div>
  <!-- ===== Sidebar ===== -->
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5
        class="offcanvas-title d-flex align-items-center"
        id="offcanvasExampleLabel"
      >
        <i class="ri-git-repository-line text-success fs-3 me-2"></i>Mama Pulsa
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="navbar-vartical-content mt-3">
        <ul class="navbar-nav flex-column px-3 row-gap-1">
          <div v-for="(item, index) in dataMenu" :key="index">
            <h6>{{ item.title }}</h6>
            <li class="nav-item">
              <RouterLink
                v-for="(items, idx) in dataMenu[index].menus"
                :key="idx"
                :to="items.path"
                exact-active-class="actived"
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
  </div>
</template>
<style scoped>
.offcanvas {
  max-width: 60%;
}
.actived {
  background-color: #ceefce;
  color: #044504 !important;
  font-weight: 400;
}
</style>
