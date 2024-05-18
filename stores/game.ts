import { defineStore } from "pinia";
import { LEVELS } from "~/default/game";
import type { TLevel } from "~/types";
export interface TGame {
  level: TLevel;
  play: boolean;
}

export const useGameStore = defineStore("game", () => {
  const state = reactive({
    level: LEVELS.EASY,
    play: false,
  });

  const setState = <K extends keyof TGame>(k: K, value: TGame[K]) => {
    state[k] = value;
  };

  return {
    state,
    setState,
  };
});
