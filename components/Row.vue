<template>
  <div class="row">
    <Record
      v-for="(color, index) in colors"
      :key="color || index"
      :color="color"
      :index="index"
      :currentColor="currentColor"
      @click="onClick"
      @swap="onSwap"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  colors: string[];
  currentColor: string;
}

const { colors, currentColor } = defineProps<Props>();
const emit = defineEmits(["click", "swap"]);
const onSwap = (data) => {
  emit("swap", data);
};
const onClick = (data) => {
  emit("click", data);
};
</script>

<style scoped>
.row {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 20px;
  border-radius: var(--border-radius-main);
  background-color: var(--bg-color-secondary);
}
</style>
