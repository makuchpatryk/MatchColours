<template>
  <div
    :class="`color ${!color && !currentColor ? 'not-active' : ''}`"
    :style="{
      opacity: color && currentColor === color ? 0.7 : 1,
    }"
    @click="selectBottle(color, index)"
    @dragover="onDragOver"
    @drop="(e: DragEvent) => onDrop(e, color)"
  >
    <div
      :style="{ height: '100%', width: 'fit-content' }"
      draggable="true"
      @dragstart="(e: DragEvent) => onDragStart(e, color)"
    >
      <BottleIcon :color="color ? color : 'rgba(0,0,0,0)'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BottleIcon from "./ui/BottleIcon.vue";

export interface Props {
  color: string;
  index: number;
  currentColor: string;
}
const { color, currentColor, index } = defineProps<Props>();
const emit = defineEmits(["click", "swap"]);
const selectBottle = (value: string, index: number) => {
  emit("click", { value, index });
};

const onDragStart = (e: DragEvent, color: string) => {
  e.dataTransfer?.setData("text/plain", color);
};
const onDragOver = (e: DragEvent) => {
  e.preventDefault();
};
const onDrop = (e: DragEvent, colorTo: string) => {
  const colorFrom = e.dataTransfer?.getData("text");

  emit("swap", { colorTo, colorFrom });
  e.dataTransfer?.clearData();
};
</script>

<style scoped>
.color {
  width: 100px;
  height: 100px;
  cursor: pointer;
  flex: 1 1 0px;
  align-items: center;
  display: flex;
  justify-content: center;
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
