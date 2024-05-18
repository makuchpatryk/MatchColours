<template>
  <div class="timer">
    <span class="timer__label">Time:</span>
    <span class="timer__number">{{ timer }}</span>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  startTimer: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["start"]);

const timer = ref(0);
const interval = ref();

watch(
  () => props.startTimer,
  () => {
    console.log("props", props.startTimer);
    if (props.startTimer) {
      startTimer();
    } else {
      timer.value = 0;
      clearInterval(interval.value);
      interval.value = null;
    }
  },
  { immediate: true }
);

const startTimer = () => {
  if (interval.value) return;

  interval.value = setInterval(() => {
    timer.value += 1;
  }, 1000);
};

onUnmounted(() => {
  clearInterval(interval.value);
  interval.value = null;
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
