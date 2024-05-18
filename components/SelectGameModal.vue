<template>
  <Modal v-model="openModel">
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
      <Button @click="onClick"> Start Game </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { LEVELS } from "~/default/game";
import Button from "./ui/Button.vue";
import Modal from "./ui/Modal.vue";
import Select from "./ui/Select.vue";
import type { TLevel } from "~/types";

const openModel = defineModel({ default: false });

const levels = ref([...Object.values(LEVELS)]);
const selectedLevel = ref<TLevel>(levels.value[0]);
const emit = defineEmits(["start"]);
const store = useGameStore();

const onSelectLevel = (option: TLevel) => {
  selectedLevel.value = option;
};

const onClick = () => {
  store.setState("level", selectedLevel.value);
  emit("start");
};
</script>

<style scoped></style>
