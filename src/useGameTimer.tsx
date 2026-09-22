import React, { useState, useEffect } from 'react';

// Example timer hook or component logic
export const useGameTimer = (initialSeconds: number, onTimeUp: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp(); // Trigger failure or time-up event
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = (newSeconds: number = initialSeconds) => {
    setIsRunning(false);
    setTimeLeft(newSeconds);
  };

  // Format seconds into MM:SS display (e.g., 03:00)
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(),
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
