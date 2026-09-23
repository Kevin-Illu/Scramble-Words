export interface WordItem {
  word: string;
  tached: boolean;
}

export interface LevelData {
  level: number;
  pool: string;
  words: WordItem[];
  complete: boolean;
}

export type ScrambleItem = {
  id: number;
  letter: string;
  used: boolean;
}

export const gameLevels: LevelData[] = [
  {
    level: 1,
    complete: false,
    pool: "L M W O L E",
    words: [
      // Length 3
      { word: "MEW", tached: false },
      { word: "OWL", tached: false },
      { word: "WOE", tached: false },
      { word: "LOW", tached: false },
      { word: "MOW", tached: false },
      { word: "OWE", tached: false },
      { word: "ELM", tached: false },
      // Length 4
      { word: "WELL", tached: false },
      { word: "MOLE", tached: false },
      { word: "MEOW", tached: false },
      { word: "MOLL", tached: false },
      { word: "MEWL", tached: false },
      // Length 6
      { word: "MELLOW", tached: false },
    ],
  },
  {
    level: 2,
    complete: false,
    pool: "H S G F T I",
    words: [
      // Length 3
      { word: "FIG", tached: false },
      { word: "FIT", tached: false },
      { word: "SIT", tached: false },
      { word: "HIS", tached: false },
      { word: "HIT", tached: false },
      { word: "IFS", tached: false },
      { word: "ITS", tached: false },
      // Length 4
      { word: "FIGS", tached: false },
      { word: "FITS", tached: false },
      { word: "FISH", tached: false },
      { word: "FIST", tached: false },
      { word: "SIGH", tached: false },
      { word: "SIFT", tached: false },
      { word: "HITS", tached: false },
      { word: "GIFT", tached: false },
      { word: "GIST", tached: false },
      { word: "THIS", tached: false },
      // Length 5
      { word: "FIGHT", tached: false },
      { word: "GIFTS", tached: false },
      { word: "SHIFT", tached: false },
      { word: "SIGHT", tached: false },
      // Length 6
      { word: "FIGHTS", tached: false },
    ],
  },
  {
    level: 3,
    complete: false,
    pool: "E M I S S L",
    words: [
      // Length 3
      { word: "ELM", tached: false },
      { word: "LEI", tached: false },
      { word: "LIE", tached: false },
      { word: "MIL", tached: false },
      // Length 4
      { word: "ELMS", tached: false },
      { word: "MISS", tached: false },
      { word: "MISE", tached: false },
      { word: "MESS", tached: false },
      { word: "MILE", tached: false },
      { word: "ISLE", tached: false },
      { word: "SEMI", tached: false },
      { word: "SLIM", tached: false },
      { word: "LIME", tached: false },
      { word: "LESS", tached: false },
      { word: "LEIS", tached: false },
      { word: "LIES", tached: false },
      // Length 5
      { word: "MILES", tached: false },
      { word: "ISLES", tached: false },
      { word: "SLIMS", tached: false },
      { word: "SMILE", tached: false },
      { word: "SLIME", tached: false },
      { word: "LIMES", tached: false },
      // Length 6
      { word: "SMILES", tached: false },
      { word: "SLIMES", tached: false },
    ],
  },
  {
    level: 4,
    complete: false,
    pool: "R A N Y C O",
    words: [
      // Length 3
      { word: "RAN", tached: false },
      { word: "RAY", tached: false },
      { word: "ANY", tached: false },
      { word: "ARC", tached: false },
      { word: "NAY", tached: false },
      { word: "NOR", tached: false },
      { word: "CON", tached: false },
      { word: "CAN", tached: false },
      { word: "CAR", tached: false },
      { word: "CAY", tached: false },
      { word: "COY", tached: false },
      { word: "OAR", tached: false },
      { word: "YON", tached: false },
      // Length 4
      { word: "ORCA", tached: false },
      { word: "CYAN", tached: false },
      { word: "CORN", tached: false },
      { word: "YARN", tached: false },
      { word: "RACY", tached: false },
      { word: "ROAN", tached: false },
      { word: "NARY", tached: false },
      // Length 5
      { word: "CORNY", tached: false },
      { word: "RAYON", tached: false },
      { word: "CARNY", tached: false },
      { word: "CRONY", tached: false },
      { word: "ACORN", tached: false },
      // Length 6
      { word: "CRAYON", tached: false },
    ],
  },
  {
    level: 5,
    complete: false,
    pool: "G A E D R G",
    words: [
      // Length 3
      { word: "AGE", tached: false },
      { word: "RED", tached: false },
      { word: "ARE", tached: false },
      { word: "RAG", tached: false },
      { word: "EAR", tached: false },
      { word: "DAG", tached: false },
      { word: "GAD", tached: false },
      { word: "GAG", tached: false },
      { word: "RAD", tached: false },
      { word: "EGG", tached: false },
      // Length 4
      { word: "AGED", tached: false },
      { word: "DARE", tached: false },
      { word: "DREG", tached: false },
      { word: "DRAG", tached: false },
      { word: "GAGE", tached: false },
      { word: "RAGE", tached: false },
      { word: "DEAR", tached: false },
      { word: "READ", tached: false },
      { word: "EGAD", tached: false },
      { word: "GEAR", tached: false },
      // Length 5
      { word: "RAGED", tached: false },
      { word: "GRADE", tached: false },
      // Length 6 (Note: 6-letter words from image have double letters or matching counts)
      { word: "DAGGER", tached: false },
      { word: "RAGGED", tached: false },
    ],
  },
];

export function getLevel(levelNum: number, levels: LevelData[]): LevelData {
  const levelToPlay = levels[levelNum - 1];
  console.log({ levelToPlay });
  return levelToPlay!;
}

export function makeScramblePoolObjs(scrambleWord: string, old?: ScrambleItem[]): ScrambleItem[] {
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

export function scramblePool(poolString: string): string {
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
