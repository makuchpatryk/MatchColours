<template>
  <div>
    <NuxtLayout>
      <h1 :class="classesResult">
        Correct matches: <span class="result__number">{{ matchNumber }}</span>
      </h1>
      <Row
        :colors="buttles"
        :current-color="currentColor"
        @click="selectButtle"
      />
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
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// const supabase = useSupabaseClient();
useHead({
  title: "MatchColours",
  meta: [
    { name: "description", content: "Amazing game about matching colours!" },
  ],
});
const emptyArray = ["", "", "", "", "", ""] as const;
const baseColours = [
  "black",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
] as const;
const defaultMatchNumber = 0;
const rightOrder = ref(shuffleArray([...baseColours]));
const buttles = ref<string[]>([...emptyArray]);
const colors = ref<string[]>([...baseColours]);
const matchNumber = ref(defaultMatchNumber);
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
  rightOrder.value = shuffleArray([...baseColours]);
  buttles.value = [...emptyArray];
  colors.value = [...baseColours];
  matchNumber.value = defaultMatchNumber;
  currentColor.value = "";

  setSnakebarMessage("Resetted!");
};
const selectButtle = ({ value, index }: { value: string; index: number }) => {
  if (currentColor.value !== "") {
    buttles.value[buttles.value.findIndex((i) => i === currentColor.value)] =
      value;
    colors.value[colors.value.findIndex((i) => i === currentColor.value)] = "";
    buttles.value[index] = currentColor.value;

    currentColor.value = "";
  } else {
    currentColor.value = value;
  }
};
const onCheckOrder = () => {
  classesResult.value = [...classesResult.value, "shake"];
  let matchNumberLocal = 0;

  for (let i = 0; i < rightOrder.value.length; i += 1) {
    if (buttles.value[i] === rightOrder.value[i]) {
      matchNumberLocal += 1;
    }
  }
  matchNumber.value = matchNumberLocal;
  setTimeout(() => {
    classesResult.value = classesResult.value.filter((i) => i !== "shake");
  }, 1000);
  setTimeout(() => {
    if (matchNumber.value === rightOrder.value.length)
      setSnakebarMessage("You are correct!");
  }, 1000);
};
</script>

<style>
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
.result.shake {
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
