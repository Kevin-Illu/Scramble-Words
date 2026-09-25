import type { Difficulty } from "@/consts";
import { useGlobalState } from "@/state/global.state";
import type { ReactElement } from "react";


interface DifficultyLevel {
  id: Difficulty;
  label: string;
  description?: string;
  icon: ReactElement
}

export interface DifficultySelectorCardProps {
  difficulties: DifficultyLevel[];
  selectedDifficulty?: string;
  onDifficultySelect: (difficulty: Difficulty) => void;
  className?: string;
}

export const DifficultySelectorCard: React.FC<DifficultySelectorCardProps> = ({
  difficulties,
  selectedDifficulty,
  onDifficultySelect,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {difficulties.map((difficulty) => (
        <div
          key={difficulty.id}
          onClick={() => onDifficultySelect(difficulty.id)}
          className={`
            p-6 rounded-lg border-2 cursor-pointer transition-all
            flex flex-col items-center gap-3
            ${(selectedDifficulty) === difficulty.id
              ? 'border-yellow-500 bg-yellow-500/20'
              : 'border-yellow-500/50 bg-transparent hover:border-yellow-500 hover:bg-blue-900/20'
            }
          `}
        >
          {difficulty.icon && (
            <div className="text-yellow-500 text-3xl">
              {difficulty.icon}
            </div>
          )}
          <div className="text-center">
            <div className="text-yellow-500 font-bold text-lg">
              {difficulty.label}
            </div>
            {difficulty.description && (
              <div className="text-yellow-500/60 text-xs mt-1">
                {difficulty.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
