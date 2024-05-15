<template>
  <div class="timer">
    <span class="timer__label">Time:</span>
    <span class="timer__number">{{ timer }}</span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["start-game"]);

const timer = ref(0);
const interval = ref();

const startTimer = () => {
  if (interval.value) return;

  interval.value = setInterval(() => {
    timer.value += 1;
  }, 1000);
};
onMounted(() => {
  startTimer();
});
onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<style scoped>
.timer {
  text-align: center;
  margin: 20px;
  font-weight: 600;
}
.timer__label {
  color: var(--text-color-secondary);
  font-size: 12px;
  margin-bottom: 5px;
}
.timer__number {
  display: block;
  font-size: 32px;
}
</style>
