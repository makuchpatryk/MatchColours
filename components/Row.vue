<template>
  <div class="row">
    <div
      :class="`color ${!color && !currentColor ? 'not-active' : ''}`"
      v-for="(color, index) in colors"
      :key="color || index"
      :style="{
        opacity: color && currentColor === color ? 0.7 : 1,
      }"
      @click="selectBottle(color, index)"
    >
      <BottleIcon :color="color ? color : 'rgba(0,0,0,0)'" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  colors: string[];
  currentColor: string;
}

const { colors, currentColor } = defineProps<Props>();
const emit = defineEmits(["click"]);
const selectBottle = (value: string, index: number) => {
  emit("click", { value, index });
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
.color {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.color:hover:not(.not-active) {
  opacity: 0.8;
}
.color.not-active {
  cursor: auto;
}

.color .bottle-icon {
  height: 100%;
}
</style>
