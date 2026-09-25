import { gameLevels } from "./game/game-logic";

export const LEVEL_STATUS = {
  playing: "PLAYING",
  passed: "PASSED",
  failed: "FAILED"
} as const;

export type LevelStatus = typeof LEVEL_STATUS[keyof typeof LEVEL_STATUS];

export const DIFFICULTY = {
  easy: 'easy',
  normal: 'normal',
  hard: 'hard',
  expert: 'expert'
} as const

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY];


export const PASSING_THRESHOLD = 70
export const TIME = 180
export const PASSING_CONDITION = 100
export const FIRST_LEVEL = 1
export const TOTAL_LEVELS = (gameLevels.length + 1);
