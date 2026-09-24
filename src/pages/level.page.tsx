import { FIRST_LEVEL, LEVEL_STATUS, PASSING_CONDITION, PASSING_THRESHOLD, TIME, TOTAL_LEVELS, type LevelStatus } from "@/consts";
import { gameLevels, getLevel, makeScramblePoolObjs, scramblePool, type LevelData, type WordItem } from "@/game/game-logic";
import { useGameTimer } from "@/hooks/gametimer";
import { Dialog } from "@/ui/dialog.component";
import { Button } from "@/ui/ui.component";
import { ChevronLeft, House, Play, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";


function validateParam(levelNum: string | number): boolean {
  const num = Number(levelNum)
  return !isNaN(num) && num >= FIRST_LEVEL && num < TOTAL_LEVELS
}

export function LevelPage() {
  const [match, params] = useRoute("/level/:num")
  const [, navigate] = useLocation()


  // when the user enters on a level
  // the level should be set it up
  useEffect(() => {
    if (!match) {
      navigate("/not-found")
      return
    }

    if (!validateParam(params.num)) {
      navigate("/not-found")
      return
    }

    const level = Number(params.num)

    setCurrentLevelNum(level)
  }, [match, params!.num, navigate])


  const [currentLevelNum, setCurrentLevelNum] = useState(Number(params!.num));

  const [levelStatus, setLevelStatus] = useState<LevelStatus>(LEVEL_STATUS.playing);
  const [currentLevel, setCurrentLevel] = useState<LevelData>(getLevel(currentLevelNum, gameLevels));
  const [progress, setProgress] = useState(0)
  const [showStatus, setShowStatus] = useState(false)
  const statusTextColorClassName = ((levelStatus === LEVEL_STATUS.failed) || (levelStatus === LEVEL_STATUS.playing))
    ? "text-red-600" : "text-green-600";


  const [dialogOpen, setDialogOpen] = useState(true);

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

    if (checkIfPassed()) {
      setLevelStatus(LEVEL_STATUS.failed)
    }

    setShowStatus(true)
  };

  const { formattedTime, startTimer, pauseTimer, resetTimer, isRunning } = useGameTimer(TIME, handleTimeUp)

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

  const checkIfPassed = () => {
    const progress = calculateLevelProgress(currentLevel); // From the previous calculation
    return progress >= PASSING_THRESHOLD;
  };

  const checkIfPassedWithOneHundredPercent = () => {
    const progress = calculateLevelProgress(currentLevel);
    return progress >= PASSING_CONDITION;
  }

  const calculateLevelProgress = (levelData: LevelData) => {
    const totalWords = levelData.words.length;
    const foundWords = levelData.words.filter(word => word.tached).length;

    if (totalWords === 0) return 0;

    return Math.round((foundWords / totalWords) * 100);
  };

  const resetAll = () => {
    resetTimer();
    setCurrentLevel(getLevel(currentLevelNum, gameLevels));
    setCurrentWord("");
    // handleScramblePool(true);
    setLevelStatus(LEVEL_STATUS.playing);
    startTimer();
    setShowStatus(false);
  }

  const startGame = () => {
    resetTimer();
    setCurrentLevel(getLevel(currentLevelNum, gameLevels));
    setCurrentWord("");
    setLevelStatus(LEVEL_STATUS.playing);
    startTimer();
    setShowStatus(false);
    setDialogOpen(false);
  }

  useEffect(() => {
    setCurrentLevel(getLevel(currentLevelNum, gameLevels))
    setScramblePool({
      currentPool: currentLevel.pool,
      poolObj: makeScramblePoolObjs(currentLevel.pool)
    })
  }, [currentLevelNum])

  // Stop timer and change the level state to complete
  useEffect(() => {
    const levelCompleted = checkIfPassedWithOneHundredPercent()

    if (isRunning && levelCompleted) {
      setShowStatus(true);
      pauseTimer();
      setCurrentLevel((prev) => ({
        ...prev,
        complete: true,
      }));
    }
  }, [currentLevel])


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
    <div className="z-1 w-screen h-screen px-16 pb-16 text-2xl level">
      <div className="flex justify-between items-center gap-4 pt-6 text-white">
        <div className="min-w-200px">
          <span>Time: {formattedTime}</span>
        </div>
        <p className={`${statusTextColorClassName}`}>
          {progress}%
        </p>

        <div className="flex justify-between items-center gap-4">
          <div className="min-w-200px">
            {isRunning ? (
              <button disabled={showStatus} onClick={() => pauseTimer()}>PAUSE</button>
            ) : (
              <button disabled={showStatus} onClick={() => startTimer()}>CONTINUE</button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full p-6 flex text-xl">
        <div className="flex flex-wrap justify-start items-center gap-8 w-[900px] pl-8">
          {currentLevel?.words.map((props, key) => (
            <DashedWord key={key} {...props} />
          ))}
        </div>

        <div className="w-full h-full flex justify-center items-center gap-4 z-10 text-white pl-20">
          <div className="flex flex-col justify-center items-center gap-4 text-7xl">
            <div className="flex flex-col justify-center items-center gap-4">

              <div className="px-6 py-20 text-center">
                <p className="h-[30px] w-fit">
                  {currentWord}
                </p>
              </div>

              <div className="flex gap-4 text-2xl">
                <button onClick={handleWordFound} disabled={!isRunning || currentWord === ""}>ENTER</button>
                <button onClick={handleRemoveLastLetter} disabled={!isRunning || currentWord === ""}>REMOVE</button>
                <button onClick={() => handleScramblePool(false)} disabled={!isRunning}>SCRAMBLE</button>
              </div>
            </div>
            <div className="gap-2 h-[200px] w-[400px] flex justify-center items-center">
              {poolObj?.map(({ letter, used, id }, key: number) => (
                <div key={key}>
                  {!used ? (
                    <button key={key} onClick={() => addLetter(letter, id)} disabled={!isRunning}>
                      <p className="">{letter}</p>
                    </button>
                  ) : <></>}
                </div>
              ))}
            </div>


          </div>


        </div>

      </div>
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={`LEVEL ${currentLevelNum}`}
        closeOnOutsideClick={false}
        showCloseButton={false}
      >
        <div className="flex justify-center items-center gap-4">
          <Button variant="secondary" onClick={() => navigate("/")}>
          <House size={36} />
          </Button>
          <Button onClick={() => startGame()}>
            <Play size={72} />
          </Button>
          <Button variant="secondary" onClick={() => navigate("/levels")}>
            <Undo2 size={36} />
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

const DashedWord = ({ word, tached }: WordItem) => {
  const wordToRender = tached ? word : word.split("").map(() => "_ ").join(" ")
  return (
    <div className="h-fit w-fit">
      <p>{wordToRender}</p>
    </div>
  )
}
