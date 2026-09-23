import { gameLevels } from "./game/game-logic";

export const LEVEL_STATUS = {
  playing: "PLAYING",
  passed: "PASSED",
  failed: "FAILED"
} as const;

export type LevelStatus = typeof LEVEL_STATUS[keyof typeof LEVEL_STATUS];

export const PASSING_THRESHOLD = 10
export const TIME = 20 // 180
export const PASSING_CONDITION = 10
export const FIRST_LEVEL = 1
export const TOTAL_LEVELS = (gameLevels.length + 1);
