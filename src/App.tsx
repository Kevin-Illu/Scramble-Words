import "./index.css";
import { useEffect, useState } from "react";
import { gameLevels, type LevelData, type WordItem } from "./GameLogic";

const LEVEL_STATUS = {
  playing: "PLAYING",
  passed: "PASSED",
  failed: "FAILED"
} as const;

type LevelStatus = typeof LEVEL_STATUS[keyof typeof LEVEL_STATUS];

function getLevel(levelNum: number, levels: LevelData[]): LevelData {
  return levels[levelNum - 1]!;
}

export function App() {
  const [currentLevelNum, setCurrentLevelNum] = useState(1);
  const [levelStatus, setLevelStatus] = useState<LevelStatus>(LEVEL_STATUS.playing);
  const [currentLevel, setCurrentLevel] = useState<LevelData>(getLevel(currentLevelNum, gameLevels));


  const [currentWord, setCurrentWord] = useState("")

  const removeLastLetter = () => {
    setCurrentWord(currentWord.slice(0, -1))
  }

  const handleWordFound = () => {
    const guessedWord = currentWord
    const isWordFounded = !!currentLevel?.words.find(i => i.word === guessedWord.toUpperCase())
    setCurrentLevel(lvl => ({
      ...lvl,
      words: lvl.words.map((i) => ({ ...i, tached: i.word === guessedWord ? isWordFounded : false }))
    }))
  };

  // useEffect(() => {
  //   console.log({ levelStatus, currentLevel, currentLevelNum });
  // }, [levelStatus, currentLevel, currentLevelNum]);
  //
  return (
    <div className="w-screen h-screen p-16">
      <div className="flex gap-4">
      <p>
        {levelStatus}
      </p>
      <p>
      Level: {currentLevelNum}
      </p>
      </div>
      <div className="w-full h-full p-6 flex justify-center items-center">
        <div className="grid grid-flow-col grid-rows-3 gap-4 w-[80%] h-[80%]">
          {currentLevel?.words.map((props, key) => (
            <DashedWord key={key} {...props} />
          ))}
        </div>
        <div className="w-full h-full flex justify-center items-center gap-4">

          <div className="flex flex-col justify-center items-center gap-4">
            <div>
              {currentWord}

              <div className="flex gap-4">

                <button onClick={handleWordFound}>Check</button>

                <button onClick={removeLastLetter}>Delete</button>
              </div>
            </div>
            <div className="gap-4 h-[200px] w-[400px] flex justify-center items-center">
              {currentLevel?.pool.split("").map((letter: string, key: number) => (
                <button key={key} onClick={() => setCurrentWord((w) => w.concat(letter))}>
                  <p className="h-[20px] w-fit">{letter}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const DashedWord = ({ word, tached }) => {
  const wordToRender = tached ? word : word.split("").map(() => "_ ").join("")
  return (
    <div className="flex gap-2">
      <p>{wordToRender}</p>
    </div>
  )
}


export default App;
