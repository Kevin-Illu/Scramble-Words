import { DIFFICULTY, PASSING_THRESHOLD, type Difficulty } from "@/consts";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface GlobalState {
  PASSING_THRESHOLD: number;
  difficulty: Difficulty;
  updatePassingThreshold: (value: number, difficulty: Difficulty) => void; 
  debugMode: boolean;
  toggleDebugMode: () => void;
};

export const useGlobalState = create<GlobalState>()(persist((set) => ({
  PASSING_THRESHOLD: PASSING_THRESHOLD,
  difficulty: DIFFICULTY.easy,
  debugMode: false,
  updatePassingThreshold: (value: number, difficulty: Difficulty) => set((s) => ({
    ...s,
    PASSING_THRESHOLD: value,
    difficulty: difficulty,
  })),
  toggleDebugMode: () => set((s) => ({
    ...s,
    debugMode: !s.debugMode
  }))
}), {
  name: 'global_state',
  storage: createJSONStorage(() => localStorage),
  partialize: (s) => ({
    PASSING_THRESHOLD: s.PASSING_THRESHOLD,
    difficulty: s.difficulty
  })
}));
