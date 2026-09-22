import "./index.css";
import { useEffect, useState } from "react";
import { gameLevels, type LevelData, type WordItem } from "./GameLogic";
import { useGameTimer } from "./useGameTimer";

const LEVEL_STATUS = {
  playing: "PLAYING",
  passed: "PASSED",
  failed: "FAILED"
} as const;

const PASSING_THRESHOLD = 10
const TIMER = 20 // 180

type LevelStatus = typeof LEVEL_STATUS[keyof typeof LEVEL_STATUS];

function getLevel(levelNum: number, levels: LevelData[]): LevelData {
  return levels[levelNum - 1]!;
}

type ScrambleItem = {
  id: number;
  letter: string;
  used: boolean;
}

function makeScramblePoolObjs(scrambleWord: string, old?: ScrambleItem[]): ScrambleItem[] {
  let oldScramblePool = old;
  const newScrambleItemObj: ScrambleItem[] = scrambleWord.split("").reduce((p: any[], c, index) => {
    p.push({
      id: index,
      letter: c,
      used: false
    })
    return p
  }, [])

  if (!old) return newScrambleItemObj;

  const updatedScramblePool = newScrambleItemObj.map(item => {
    const oldItem = oldScramblePool!.find(i => i.letter === item.letter);
    oldScramblePool = oldScramblePool?.filter(i => i.id !== oldItem?.id)
    const isUsed = item.letter === oldItem?.letter ? oldItem.used : false;

    return {
      ...item,
      used: isUsed
    }
  })

  return updatedScramblePool
}

function scramblePool(poolString: string): string {
  // Remove any spaces to work purely with the letters, then split into an array
  let letters = poolString.replace(/\s+/g, '').split('');
  let shuffled: string[];

  do {
    // Fisher-Yates shuffle algorithm
    shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Repeat if the shuffled version is identical to the original letters
  } while (shuffled.join('') === letters.join(''));

  // Join back with spaces so it matches your display format (e.g., "L M W O L E")
  return shuffled.join('');
};

export function App() {
  const [currentLevelNum, setCurrentLevelNum] = useState(2);
  const [levelStatus, setLevelStatus] = useState<LevelStatus>(LEVEL_STATUS.playing);
  const [currentLevel, setCurrentLevel] = useState<LevelData>(getLevel(currentLevelNum, gameLevels));
  const [progress, setProgress] = useState(0)
  
  const [showStatus, setShowStatus] = useState(false)

  const getStatus = () => {
    if (levelStatus === LEVEL_STATUS.passed) return "YOU WIN";

    return "YOU LOSE"!
  }


  const [{ currentPool, poolObj }, setScramblePool] = useState({
    currentPool: currentLevel.pool,
    poolObj: makeScramblePoolObjs(currentLevel.pool)
  })
  const [currentWord, setCurrentWord] = useState("")
  const handleTimeUp = () => {
    completeCurrentLevel()

    if (checkIfPassed(currentLevel)) {
      setLevelStatus(LEVEL_STATUS.failed)
    }

    setShowStatus(true)
  };

  const { formattedTime, startTimer, pauseTimer, resetTimer, isRunning, timeLeft } = useGameTimer(TIMER, handleTimeUp)

  const completeCurrentLevel = () => {
    setCurrentLevel(level => ({
      ...level,
      complete: true
    }))
  }

  const handleRemoveLastLetter = () => {
    const lastLetter = currentWord[currentWord.length - 1] ?? ""
    const scrambleLetter = poolObj.filter(w => w.letter === lastLetter && w.used)[0]!

    setScramblePool((prev) => ({
      ...prev,
      poolObj: prev.poolObj.map(l => ({
        ...l,
        used: l.id === scrambleLetter.id ? false : l.used
      }))
    }))

    setCurrentWord(currentWord.slice(0, -1))
  }

  const addLetter = (letter: string, id: number) => {
    setScramblePool((prev) => ({
      ...prev,
      poolObj: prev.poolObj.map(l => ({
        ...l,
        used: l.id === id ? true : l.used
      }))
    }))

    setCurrentWord(prev => prev += letter)
  }

  const handleScramblePool = (restore: boolean = false) => {
    const newPool = scramblePool(currentPool)
    let newPoolObj;

    if (!restore) {
      newPoolObj = makeScramblePoolObjs(newPool, poolObj)
    } else {
      newPoolObj = makeScramblePoolObjs(newPool)
    }

    setScramblePool(() => ({
      currentPool: newPool,
      poolObj: newPoolObj
    }))
  }

  const handleWordFound = () => {
    const guessedWord = currentWord.toUpperCase();

    // chekcing if the word is wgrong
    const wordExists = currentLevel?.words.some(w => w.word === guessedWord);
    if (!wordExists) {
      console.log("is not a valid word");
      return;
    }

    // checking if the word exist already
    const wordAlreadyExists = currentLevel.words.some(w => w.word === guessedWord && w.tached)
    if (wordAlreadyExists) {
      console.log("word already exists")
      return;
    }

    // showing the user the founded word on the side of the screen
    // by toggle the tached flag
    setCurrentLevel(lvl => ({
      ...lvl,
      words: lvl.words.map(word =>
        word.word === guessedWord
          ? { ...word, tached: true }
          : word
      )
    }))

    // reset the pool so the user can select again
    setScramblePool(prev => ({
      ...prev,
      poolObj: prev.poolObj.map((letter) => ({ ...letter, used: false }))
    }))

    // throw the confetti
    setCurrentWord("")
  }

  const checkIfPassed = (levelData: LevelData) => {
    const progress = calculateLevelProgress(levelData); // From the previous calculation
    return progress >= PASSING_THRESHOLD;
  };

  const calculateLevelProgress = (levelData: LevelData) => {
    const totalWords = levelData.words.length;
    const foundWords = levelData.words.filter(word => word.tached).length;

    if (totalWords === 0) return 0;

    return Math.round((foundWords / totalWords) * 100);
  };

  const resetAll = () => {
    resetTimer();
    setCurrentLevel(getLevel(currentLevelNum, gameLevels));
    setCurrentWord("")
    handleScramblePool(true);
    setLevelStatus(LEVEL_STATUS.playing)
    startTimer();
  }

  // Stop timer and change the level state to complete
  useEffect(() => {
    if (isRunning && progress === 100) {
      pauseTimer()
      setCurrentLevel((prev) => ({
        ...prev,
        complete: true,
      }))
    }
  }, [timeLeft])


  // it changes whenever the user assert a word
  // correclty so we can see the progress right on the screen
  useEffect(() => {
    const progress = calculateLevelProgress(currentLevel);
    setProgress(progress)

    if (progress >= PASSING_THRESHOLD) {
      setLevelStatus(LEVEL_STATUS.passed)
    }

    // it should execute when the user assert a word
  }, [currentLevel]);


  return (
    <div className="w-screen h-screen p-16 text-xl">
      <div className="flex gap-4">
        <p>
          {levelStatus === LEVEL_STATUS.playing ? LEVEL_STATUS.failed : levelStatus} {progress}%
        </p>
        <p>
          Level: {currentLevelNum}
        </p>
        <div className="timer-display">
          <span>Time: {formattedTime}</span>
        </div>
        <div>
          <button onClick={() => { resetAll() }}>PLAY</button>
        </div>
        <div>
          {isRunning ? (
            <button onClick={() => pauseTimer()}>PAUSE</button>
          ) : (
            <button onClick={() => startTimer()}>CONTINUE</button>
          )}
        </div>

        <div>
          <div>
            <p>{ showStatus ? getStatus(): ""}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full p-6 flex justify-center items-center">
        <div className="grid grid-flow-col grid-rows-3 gap-4 w-[80%] h-[80%] place-items-center">
          {currentLevel?.words.map((props, key) => (
            <DashedWord key={key} {...props} />
          ))}
        </div>
        <div className="w-full h-full flex justify-center items-center gap-4">

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-4">

              <div className="text-6xl px-6 py-20 text-center">
                <p className="h-[30px] w-fit">
                  {currentWord}
                </p>
              </div>

              <div className="flex gap-4">
                <button onClick={handleWordFound} disabled={!isRunning || currentWord === ""}>ENTER</button>
                <button onClick={handleRemoveLastLetter} disabled={!isRunning || currentWord === ""}>REMOVE</button>
                <button onClick={() => handleScramblePool(false)} disabled={!isRunning}>SCRAMBLE</button>
              </div>
            </div>
            <div className="gap-4 h-[200px] w-[400px] flex justify-center items-center">
              {poolObj?.map(({ letter, used, id }, key: number) => (
                <div key={key}>
                  {!used ? (
                    <button key={key} onClick={() => addLetter(letter, id)} disabled={!isRunning}>
                      <p className="h-[20px] w-fit">{letter}</p>
                    </button>
                  ) : <></>}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const DashedWord = ({ word, tached }: WordItem) => {
  const wordToRender = tached ? word : word.split("").map(() => "_ ").join("")
  return (
    <div className="flex gap-2 h-[30px]">
      <p>{wordToRender}</p>
    </div>
  )
}


export default App;
