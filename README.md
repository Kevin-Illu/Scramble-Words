# Scramble Words

A recreation of the English class word puzzle mini-game from Rockstar Games' *Bully* (Canis Canem Edit), built with React and Bun.

Remember sweating bullets in Mr. Galloway's English class while desperately trying to turn six random letters into real words before the bell rang? This project brings that exact Bullworth Academy experience straight to your browser, minus the detention.

---

## Screenshots

<!-- Add Screenshot of Main Menu / Difficulty Selector here -->
<!-- Example: ![Main Menu](path/to/main-menu.png) -->

<!-- Add Screenshot of Gameplay Board here -->
<!-- Example: ![Gameplay](path/to/gameplay.png) -->

<!-- Add Screenshot of Results / Passed Level here -->
<!-- Example: ![Results](path/to/results.png) -->

---

## Features

- **Difficulty Selector**: Choose how lenient Mr. Galloway should be. Pick between Easy (40% accuracy), Normal (60%), Hard (70%), or Expert (100% completion for the overachievers).
- **English Classes 1 to 5**: Faithfully recreated letter pools and solution lists straight out of the original game.
- **Scramble & Shuffler**: Shuffle unused letters around when your brain refuses to see any more anagrams.
- **3-Minute Countdown**: Race against the clock with pause and resume support.
- **Victory Confetti**: For that brief dopamine hit when you pass the class.
- **Web Terminal Debug Mode**: For the moments your vocabulary completely abandons you. Open your browser's developer console (F12) and run:

```javascript
window.toggleDebugMode()
```

This reveals every hidden word on the chalkboard so you can inspect solutions or test levels without losing your mind.

---

## Tech Stack

- **Runtime & Bundler**: Bun
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (persists your difficulty settings to localStorage)
- **Routing**: Wouter

---

## Getting Started

Make sure you have [Bun](https://bun.sh/) installed.

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun dev
   ```

3. Open `http://localhost:3000` in your browser.

To bundle for production:
```bash
bun run build
```

---

## Credits

- Original mini-game concept by Rockstar Games (*Bully*).
- Recreation by Kevin Illu.
