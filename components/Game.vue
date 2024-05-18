<template>
  <div>
    <PanelGame
      :items="panelItems"
      :props="panelItemsProps"
      :events="panelItemsEvents"
    />
    <Row
      :colors="bottles"
      :current-color="currentColor"
      @click="selectBottle"
      @swap="swapBottle"
    />
    <div class="action-buttons">
      <Button @click="onCheckOrder" color="secondary">Check Order</Button>
      <Button @click="onInitGame">Reset Game</Button>
      <Button @click="onResultModal">Show Rankings</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["info", "change-status", "show-ranking"]);
const {
  bottles,
  matchNumber,
  currentColor,
  tries,
  shake,
  startTimer,
  onCheckOrder,
  selectBottle,
  swapBottle,
  onInitGame,
  onResultModal,
} = useGame({ emit });

import Button from "./ui/Button.vue";
import Timer from "./Timer.vue";
import Tries from "./Tries.vue";
import Match from "./Match.vue";
import type { TPanelComponet, TPanelEvents, TPanelProps } from "~/types";

const panelItems = computed<TPanelComponet[]>(() => [
  {
    component: Timer,
  },
  {
    component: Tries,
  },
  {
    component: Match,
  },
]);
const panelItemsProps = computed<TPanelProps>(() => {
  return {
    matchNumber: matchNumber.value,
    shake: shake.value,
    tries: tries.value,
    startTimer: startTimer.value,
  };
});
const panelItemsEvents = computed<TPanelEvents>(() => ({
  getFinishedTime: () => {},
}));
</script>

<style scoped>
.check-order-button {
  padding: 30px;
  display: block;
  margin: auto;
  border-radius: 10px;
  background-color: green;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
</style>
