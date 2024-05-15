<template>
  <div :class="classesResult">
    <span class="result__label">Correct matches:</span>
    <span class="result__number">{{ props.matchNumber }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  matchNumber: number;
  shake: boolean;
}
const props = defineProps<Props>();

const classesResult = computed(() => {
  return ["result", props.shake ? "shake" : ""];
});
</script>

<style scoped>
.result {
  text-align: center;
  margin: 20px;
  font-weight: 600;
}
.result.shake {
  animation: horizontal-shaking 0.5s 1;
}
.result__label {
  color: var(--text-color-secondary);
  font-size: 12px;
}
.result__number {
  display: block;
  font-size: 32px;
}

@keyframes horizontal-shaking {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
