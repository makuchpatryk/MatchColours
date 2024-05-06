<template>
  <Teleport to="body">
    <Transition>
      <div v-if="openModel" class="modal">
        <Button v-if="closeButton" @click="updateOpenModal">Close</Button>
        <p class="modal__text"><slot /></p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
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
.modal {
  background-color: white;
  padding: 15px 20px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: var(--border-radius-main);
}

.modal__text {
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
