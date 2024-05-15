<template>
  <div class="tries">
    <span class="tries__label">Tries:</span>
    <span class="tries__number">{{ tries }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tries: number;
}
const { tries } = defineProps<Props>();
</script>

<style scoped>
.tries {
  text-align: center;
  margin: 20px;
  font-weight: 600;
}
.tries__label {
  color: var(--text-color-secondary);
  font-size: 12px;
}
.tries__number {
  display: block;
  font-size: 32px;
}
</style>
