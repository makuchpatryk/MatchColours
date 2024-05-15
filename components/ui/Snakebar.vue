<template>
  <Teleport to="body">
    <Transition>
      <div v-if="openModel" class="snakebar">
        <Button v-if="closeButton" @click="updateOpenModal">Close</Button>
        <p class="snakebar__text"><slot /></p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Button from "./Button.vue";

export interface Props {
  delay?: number;
  closeButton?: boolean;
}

const openModel = defineModel();
const { delay } = withDefaults(defineProps<Props>(), {
  delay: 1500,
  closeButton: false,
});

const updateOpenModal = () => {
  openModel.value = false;
};
watch(openModel, () => {
  if (openModel.value) {
    setTimeout(() => {
      openModel.value = false;
    }, delay);
  }
});
</script>

<style scoped>
.snakebar {
  background-color: var(--white);
  padding: 10px 20px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: var(--border-radius-main);
}

.snakebar__text {
  color: var(--primary);
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
