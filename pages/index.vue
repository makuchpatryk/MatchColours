<template>
  <div class="game-page">
    <Game
      @info="setSnakebarMessage"
      @change-status="onShowModal"
      @show-ranking="onRankingModal"
    />
    <SelectGameModal v-model="modalOpen" @start="onStart" />
    <Snakebar v-model="snakebarOpen">{{ snakebarInfo }}</Snakebar>
    <RankingModal v-model="rankingModelOpen" />
  </div>
</template>

<script setup lang="ts">
import Snakebar from "~/components/ui/Snakebar.vue";

definePageMeta({
  layout: "game",
  middleware: "auth",
});
const store = useGameStore();
const snakebarOpen = ref(false);
const modalOpen = ref(false);
const rankingModelOpen = ref(false);
const snakebarInfo = ref("");

const setSnakebarMessage = ({ info }: { info: string }) => {
  snakebarInfo.value = info;
  snakebarOpen.value = true;
};

const onStart = () => {
  store.setState("play", true);
  modalOpen.value = false;
};
const onShowModal = () => {
  store.setState("play", false);
  modalOpen.value = true;
};
const onRankingModal = () => {
  rankingModelOpen.value = true;
};
onMounted(() => {
  onShowModal();
});
</script>
<style scoped>
.game-page {
}
</style>
