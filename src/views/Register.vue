<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <div style="height: 100vh" class="d-flex align-items-center">
    <div class="content border p-4 rounded mx-auto my-auto">
      <h2 class="text-dark mb-5">Register</h2>
      <form>
        <div class="mb-3">
          <h6 for="name" class="form-label">Name</h6>
          <input type="text" class="form-control" id="name" />
        </div>
        <div class="mb-3">
          <h6 for="email" class="form-label">Email</h6>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <h6 for="password" class="form-label">Password</h6>
          <input type="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-success mt-3">Sign Up</button>
      </form>

      <div class="text-center mt-5 border-0">
        <h6>
          Already have an account?
          <button
            @click="router.push('/login')"
            class="text-success bg-transparent border-0"
          >
            Sign In
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
