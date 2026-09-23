import { gameLevels } from "@/game/game-logic";
import { Link } from "wouter";


export function LevelsSelectorPage() {
  return (
    <div className="levels w-screen h-screen text-xl text-white">
      {gameLevels.map((level) => (
        <Link key={level.level} href={`level/${level.level}`}>
          <button>
            <p className={level.complete ? "decoration-dashed" : ""}>
              Level {level.level}
            </p>
          </button>
        </Link>
      ))}
    </div>
  )
}
