<script setup>
import { ref, watchEffect } from "vue";

const Props = defineProps({
  isLoading: Boolean,
});
const progress = ref(0);

watchEffect(() => {
  if (Props.isLoading) {
    const timer = setInterval(() => {
      progress.value += Math.floor(Math.random() * 10);
      if (progress.value >= 100) {
        clearInterval(timer);
        // isLoading.value = false;
        progress.value = 0;
      }
    }, 100);
  }
});
</script>
<template>
  <div class="progress-bar" v-if="isLoading">
    <div class="progress-bar__inner" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<style>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #f2f2f2;
}
.progress-bar__inner {
  height: 100%;
  background-color: #1cd635;
  transition: width 0.2s ease-in-out;
}
</style>
