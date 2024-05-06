<template>
  <div class="row">
    <div
      :class="`color ${!color && !currentColor ? 'not-active' : ''}`"
      v-for="(color, index) in colors"
      :key="color || index"
      :style="{
        backgroundColor: color ? color : '#333',
        border: color && currentColor === color ? '1px solid white' : '',
      }"
      @click="selectButtle(color, index)"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  colors: string[];
  currentColor: string;
}

const { colors, currentColor } = defineProps<Props>();
const emit = defineEmits(["click"]);
const selectButtle = (value: string, index: number) => {
  emit("click", { value, index });
};
</script>

<style scoped>
.row {
  display: flex;
  gap: 20px;
}
.color {
  width: 100%;
  height: 100px;
  cursor: pointer;
  border: 1px solid #333;
}
.color:hover:not(.not-active) {
  opacity: 0.8;
}
.color.not-active {
  cursor: auto;
}
</style>
