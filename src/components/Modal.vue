<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { watchEffect, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);
const target = ref();
onClickOutside(target, () => emit("close"));

watchEffect(() => {
  if (props.show) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = null;
  }
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header">
            <div class="modal-close" @click="emit('close')">
              <i class="ri-close-line"></i>
            </div>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 600px;
  margin: auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-body {
  margin: 20px 20px;
}
.modal-close {
  position: absolute;
  top: 0rem;
  right: 0.5rem;
  font-size: 1.8rem;
  cursor: pointer;
}
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
@media (max-width: 576px) {
  .modal-container {
    width: 350px;
  }
}
</style>
