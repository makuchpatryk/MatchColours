<template>
  <Modal v-model="modalOpen">
    <template #header>
      <h1>Start Game</h1>
      <p>To start the game you need to select a game level.</p>
    </template>
    <template #body>
      <Select
        label="Select Level"
        v-model="selectedLevel"
        :options="levels"
        @select="onSelectLevel"
      />
      <Button @click="() => emit('start', { selectedLevel })">
        Start Game
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { LEVELS } from "~/default/game";
import Button from "./ui/Button.vue";
import Modal from "./ui/Modal.vue";
import Select from "./ui/Select.vue";

const levels = ref([...Object.values(LEVELS)]);
const selectedLevel = ref(levels.value[0]);
const modalOpen = ref(true);
const emit = defineEmits(["start"]);

const onSelectLevel = (option: string) => {
  selectedLevel.value = option;
};
</script>

<style scoped></style>
