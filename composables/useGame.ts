import { BASE_COLOURS, DEFAULT_MATCH_NUMBER } from "@/default/game";
import type { ToRef } from "vue";

type Emit = (
  event: "info" | "change-status" | "show-ranking",
  ...args: any[]
) => void;

export default function useClickOutside({ emit }: { emit: Emit }) {
  const store = useGameStore();

  const rightOrder = ref(shuffleArray([...BASE_COLOURS[store.state.level]]));
  const bottles = ref<string[]>([...BASE_COLOURS[store.state.level]]);
  const matchNumber = ref(DEFAULT_MATCH_NUMBER);
  const currentColor = ref("");

  const tries = ref(0);
  const shake = ref(false);
  const startTimer = ref(false);

  watch(
    () => store.state.play,
    () => {
      if (store.state.play) onInitGame({ resetSnakebar: false });
    }
  );
  const onInitGame = ({
    resetSnakebar = true,
  }: {
    resetSnakebar?: boolean;
  }) => {
    rightOrder.value = shuffleArray([...BASE_COLOURS[store.state.level]]);
    bottles.value = [...BASE_COLOURS[store.state.level]];
    matchNumber.value = DEFAULT_MATCH_NUMBER;
    currentColor.value = "";
    startTimer.value = false;
    nextTick(() => {
      startTimer.value = true;
    });

    resetSnakebar ? emit("info", { info: "Resetted!" }) : "";
  };

  const onResultModal = () => {
    emit("show-ranking");
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
  const swapBottle = ({
    colorTo,
    colorFrom,
  }: {
    colorTo: string;
    colorFrom: string;
  }) => {
    const bottleFromIndex = bottles.value.findIndex((i) => i === colorFrom);
    const bottleToIndex = bottles.value.findIndex((i) => i === colorTo);
    bottles.value[bottleFromIndex] = colorTo;
    bottles.value[bottleToIndex] = colorFrom;
    currentColor.value = "";
  };
  const onCheckOrder = () => {
    shake.value = true;
    let matchNumberLocal = 0;

    for (let i = 0; i < rightOrder.value.length; i += 1) {
      if (bottles.value[i] === rightOrder.value[i]) {
        matchNumberLocal += 1;
      }
    }
    matchNumber.value = matchNumberLocal;
    tries.value = tries.value + 1;
    setTimeout(() => {
      shake.value = false;
    }, 1000);
    setTimeout(() => {
      if (matchNumber.value === rightOrder.value.length) {
        emit("info", { info: "You are correct!" });
        emit("change-status");
        startTimer.value = false;
        // saveResult()
      }
    }, 1000);
  };

  return {
    rightOrder,
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
  };
}
