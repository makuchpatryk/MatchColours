<template>
  <Teleport to="body">
    <Transition>
      <div v-if="openModal" class="modal">
        <div class="modal__content">
          <slot name="header">
            <h1>Hello from the modal!</h1>
          </slot>
          <slot name="body">
            <p>content</p>
          </slot>
          <button
            v-if="showCloseButton"
            class="modal__close-btn"
            @click="openModal = false"
          >
            <XMarkIcon />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
interface Props {
  showCloseButton?: boolean;
}

const openModal = defineModel();
const { showCloseButton } = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
});
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  width: 0;
  width: 100%;
  height: 100%;
}
.modal__content {
  background-color: var(--white);
  padding: 10px 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius-main);
  min-width: 300px;
}
.modal__close-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  background: no-repeat;
  border: none;
  cursor: pointer;
  position: absolute;
  top: -25px;
  right: -25px;
  color: white;
  border-radius: 50px;
  padding: 5px;
}
.modal__close-btn:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
