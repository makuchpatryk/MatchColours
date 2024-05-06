<template>
  <h1 :class="classesResult">
    Correct matches: <span class="result__number">{{ matchNumber }}</span>
  </h1>
  <Row :colors="buttles" :current-color="currentColor" @click="selectButtle" />
  <span class="space" />
  <Row
    :colors="colors"
    :current-color="currentColor"
    @click="({ value }) => (currentColor = value)"
  />
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
const buttles = ref<string[]>([...EMPTY_ARRAY]);
const colors = ref<string[]>([...BASE_COLOURS]);
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
  buttles.value = [...EMPTY_ARRAY];
  colors.value = [...BASE_COLOURS];
  matchNumber.value = DEFAULT_MATCH_NUMBER;
  currentColor.value = "";

  setSnakebarMessage("Resetted!");
};
const selectButtle = ({ value, index }: { value: string; index: number }) => {
  if (currentColor.value !== "") {
    buttles.value[buttles.value.findIndex((i) => i === currentColor.value)] =
      value;
    colors.value[colors.value.findIndex((i) => i === currentColor.value)] =
      value;
    buttles.value[index] = currentColor.value;

    currentColor.value = "";
  } else {
    currentColor.value = value;
  }
};
const onCheckOrder = () => {
  classesResult.value = [...classesResult.value, "shake-animation"];
  let matchNumberLocal = 0;

  for (let i = 0; i < rightOrder.value.length; i += 1) {
    if (buttles.value[i] === rightOrder.value[i]) {
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
.space {
  height: 20px;
  display: block;
  width: 100%;
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
