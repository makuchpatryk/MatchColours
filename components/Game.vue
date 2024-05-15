<template>
  <div>
    <PanelGame :items="panelItems" :props="panelItemsProps" />
    <Row
      :colors="bottles"
      :current-color="currentColor"
      @click="selectBottle"
      @swap="swapBottle"
    />
    <div class="action-buttons">
      <Button @click="onCheckOrder" color="secondary">Check Order</Button>
      <Button @click="onResetGame">Reset Game</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  level: TLevel;
}
const props = defineProps<Props>();
const emit = defineEmits(["info", "chnage-status"]);
const level = toRef(() => props.level);
const {
  bottles,
  matchNumber,
  currentColor,
  tries,
  shake,
  onCheckOrder,
  selectBottle,
  swapBottle,
  onResetGame,
} = useGame({ level, emit });

import Button from "./ui/Button.vue";
import Timer from "./Timer.vue";
import Tries from "./Tries.vue";
import Match from "./Match.vue";
import type { TLevel, TPanelComponet, TPanelProps } from "~/types";

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
  };
});
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
