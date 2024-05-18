import type { TLevel } from "~/types";

export const BASE_COLOURS_EASY = ["red", "blue", "green"] as const;
export const BASE_COLOURS_MEDIUM = [
  "black",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
] as const;
export const BASE_COLOURS_HARD = [
  "black",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "grey",
  "pink",
  "orange",
] as const;

export const BASE_COLOURS = {
  EASY: BASE_COLOURS_EASY,
  MEDIUM: BASE_COLOURS_MEDIUM,
  HARD: BASE_COLOURS_HARD,
};
export const DEFAULT_MATCH_NUMBER = 0;

export const LEVELS: { EASY: TLevel; MEDIUM: TLevel; HARD: TLevel } = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};
