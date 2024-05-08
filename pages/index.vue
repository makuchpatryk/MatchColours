<template>
  <h1 :class="classesResult">
    Correct matches: <span class="result__number">{{ matchNumber }}</span>
  </h1>
  <Row :colors="bottles" :current-color="currentColor" @click="selectBottle" />
  <div class="action-buttons">
    <Button @click="onCheckOrder" color="secondary">Check Order</Button>
    <Button @click="onResetGame">Reset Game</Button>
  </div>
  <Snakebar v-model="snakebarOpen"> {{ snakebarInfo }}</Snakebar>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "game",
  middleware: "auth",
});
import {
  BASE_COLOURS,
  DEFAULT_MATCH_NUMBER,
  EMPTY_ARRAY,
} from "@/default/game";

const rightOrder = ref(shuffleArray([...BASE_COLOURS]));
const bottles = ref<string[]>([...BASE_COLOURS]);
const matchNumber = ref(DEFAULT_MATCH_NUMBER);
const classesResult = ref(["result"]);
const snakebarOpen = ref(false);
const snakebarInfo = ref("");

const currentColor = ref("");

const setSnakebarMessage = (info: string) => {
  snakebarInfo.value = info;
  snakebarOpen.value = true;
};

// onMounted(async () => {
//   let { data: rankings, error } = await supabase.from("rankings").select("*");
//   console.log("rankings", rankings);
// });

const onResetGame = () => {
  rightOrder.value = shuffleArray([...BASE_COLOURS]);
  bottles.value = [...BASE_COLOURS];
  matchNumber.value = DEFAULT_MATCH_NUMBER;
  currentColor.value = "";

  setSnakebarMessage("Resetted!");
};
const selectBottle = ({ value, index }: { value: string; index: number }) => {
  if (currentColor.value !== "") {
    bottles.value[bottles.value.findIndex((i) => i === currentColor.value)] =
      value;
    bottles.value[index] = currentColor.value;

    currentColor.value = "";
  } else {
    currentColor.value = value;
  }
};
const onCheckOrder = () => {
  classesResult.value = [...classesResult.value, "shake-animation"];
  let matchNumberLocal = 0;

  for (let i = 0; i < rightOrder.value.length; i += 1) {
    if (bottles.value[i] === rightOrder.value[i]) {
      matchNumberLocal += 1;
    }
  }
  matchNumber.value = matchNumberLocal;
  setTimeout(() => {
    classesResult.value = classesResult.value.filter(
      (i) => i !== "shake-animation"
    );
  }, 1000);
  setTimeout(() => {
    if (matchNumber.value === rightOrder.value.length)
      setSnakebarMessage("You are correct!");
  }, 1000);
};
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
.result {
  text-align: center;
  margin: 20px;
}
.result.shake-animation {
  animation: horizontal-shaking 0.5s 1;
}
.action-buttons {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
.result__number {
  display: block;
  font-size: 50px;
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
