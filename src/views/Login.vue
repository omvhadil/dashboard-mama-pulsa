<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/Auth.js";

const router = useRouter();

const object = reactive({
  email: "",
  password: "",
});

const onLogin = () => {
  const data = {
    email: object.email,
    password: object.password,
  };
  useAuthStore().PostLogin(data);
};
</script>
<template>
  <div style="height: 100vh" class="d-flex align-items-center">
    <div class="content border p-4 rounded mx-auto my-auto">
      <h2 class="text-dark mb-5">Login</h2>
      <form @submit.prevent="onLogin">
        <div class="mb-3">
          <h6 for="exampleInputEmail1" class="form-label">Email</h6>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="object.email"
          />
        </div>
        <div class="mb-3">
          <h6 for="exampleInputPassword1" class="form-label">Password</h6>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="object.password"
          />
        </div>
        <button type="submit" class="btn btn-success mt-3">Sign In</button>
      </form>

      <div class="text-center mt-5 border-0">
        <h6>
          Create New Account?
          <button
            @click="router.push('/register')"
            class="text-success bg-transparent border-0"
          >
            Sign Up
          </button>
        </h6>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  width: 500px;
}
</style>
