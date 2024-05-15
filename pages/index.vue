<template>
  <div class="game-page">
    <StartGameModal v-if="gameState === 'prepare'" @start="onStart" />
    <Game
      :level="level"
      @info="setSnakebarMessage"
      @chnage-status="onShowModal"
    />
    <Snakebar v-model="snakebarOpen">{{ snakebarInfo }}</Snakebar>
  </div>
</template>

<script setup lang="ts">
import Snakebar from "~/components/ui/Snakebar.vue";
import type { TLevel } from "~/types";

definePageMeta({
  layout: "game",
  middleware: "auth",
});

const snakebarOpen = ref(false);
const snakebarInfo = ref("");
const gameState = ref<"prepare" | "gaming" | "finished">("prepare");
const level = ref<TLevel>("EASY");

const setSnakebarMessage = ({ info }: { info: string }) => {
  snakebarInfo.value = info;
  snakebarOpen.value = true;
};

const onStart = ({ selectedLevel }: { selectedLevel: TLevel }) => {
  gameState.value = "gaming";

  level.value = selectedLevel;
};
const onShowModal = () => {
  console.log("onShowModal");
  gameState.value = "prepare";
};

// onMounted(async () => {
//   let { data: rankings, error } = await supabase.from("rankings").select("*");
//   console.log("rankings", rankings);
// });
</script>
<style scoped>
.game-page {
}
</style>
