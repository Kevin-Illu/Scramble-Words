import bgImage from "@/assets/background-home-and-select-levels.png";
import { DIFFICULTY, type Difficulty } from "@/consts";
import { useGlobalState } from "@/state/global.state";
import { DifficultySelectorCard } from "@/ui/difficulty-selector.component";
import { LoadingScreen } from "@/ui/loading-screen.component";
import { MenuContainer } from "@/ui/ui.component";
import { Crown, Flame, Shield, University, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useShallow } from "zustand/shallow";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 25) + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);


  const [, navigate] = useLocation();
  const { updatePassingThreshold, selectedDifficulty } = useGlobalState(useShallow((s) => ({
    updatePassingThreshold: s.updatePassingThreshold,
    selectedDifficulty: s.difficulty
  })))
  const [difficulty, setDifficulty] = useState<Difficulty>(selectedDifficulty);

  const difficulties = [
    {
      id: DIFFICULTY.easy,
      label: 'EASY',
      description: 'For beginners',
      icon: <Zap size={32} />
    },
    {
      id: DIFFICULTY.normal,
      label: 'NORMAL',
      description: 'Standard',
      icon: <Shield size={32} />
    },
    {
      id: DIFFICULTY.hard,
      label: 'HARD',
      description: 'Challenging',
      icon: <Flame size={32} />
    },
    {
      id: DIFFICULTY.expert,
      label: 'EXPERT',
      description: 'Expert only',
      icon: <Crown size={32} />
    },
  ];

  useEffect(() => {
    switch (difficulty) {
      case DIFFICULTY.easy:
        updatePassingThreshold(40, DIFFICULTY.easy);
        break;
      case DIFFICULTY.normal:
        updatePassingThreshold(60, DIFFICULTY.normal);
        break;
      case DIFFICULTY.hard:
        updatePassingThreshold(70, DIFFICULTY.hard);
        break;
      case DIFFICULTY.expert:
        updatePassingThreshold(100, DIFFICULTY.expert);
        break;
      default:
        updatePassingThreshold(50, DIFFICULTY.normal);
        break;
    }
  }, [difficulty])

  return (
    <div className="home w-screen h-screen text-white">
      <LoadingScreen
        isLoading={isLoading}
        progress={progress}
        backgroundImage={bgImage}
      />
      <div className="w-full h-full gap-8 flex flex-col justify-center items-center">
        <div>
          <MenuContainer
            title={"SCRAMBLE WORDS"}
            titleSize="lg"
            options={[
              {
                id: "levels",
                label: "LEVELS",
                icon: <University size={26} />,
                onClick: () => navigate("levels")
              }
            ]}
            quote="The hardest years in life are those between ten and seventy. — Helen Hayes">
            <DifficultySelectorCard
              difficulties={difficulties}
              onDifficultySelect={setDifficulty}
              selectedDifficulty={difficulty}
            >
            </DifficultySelectorCard>
          </MenuContainer>
        </div>
        <p className="text-gray-200">Bully's english class mini game recreation made by Kevin Illu</p>
      </div>
    </div>
  )
}
