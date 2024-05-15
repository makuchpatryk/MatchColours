import { BASE_COLOURS, DEFAULT_MATCH_NUMBER } from "@/default/game";
import type { ToRef } from "vue";
import type { TLevel } from "~/types";

type Emit = (event: "info" | "chnage-status", ...args: any[]) => void;

export default function useClickOutside({
  level,
  emit,
}: {
  level: ToRef<TLevel>;
  emit: Emit;
}) {
  const rightOrder = ref(shuffleArray([...BASE_COLOURS[level.value]]));
  const bottles = ref<string[]>([...BASE_COLOURS[level.value]]);
  const matchNumber = ref(DEFAULT_MATCH_NUMBER);
  const currentColor = ref("");

  const tries = ref(0);
  const shake = ref(false);
  watch(level, () => {
    onResetGame({ resetSnakebar: false });
  });
  const onResetGame = ({
    resetSnakebar = true,
  }: {
    resetSnakebar?: boolean;
  }) => {
    rightOrder.value = shuffleArray([...BASE_COLOURS[level.value]]);
    bottles.value = [...BASE_COLOURS[level.value]];
    matchNumber.value = DEFAULT_MATCH_NUMBER;
    currentColor.value = "";

    resetSnakebar ? emit("info", { info: "Resetted!" }) : "";
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
        emit("chnage-status");
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
    onCheckOrder,
    selectBottle,
    swapBottle,
    onResetGame,
  };
}
