import React, { useState } from 'react';
import Confetti from 'react-confetti';

interface ConfettiProps {
  trigger?: boolean;
  duration?: number;
  numberOfPieces?: number;
}

export const ConfettiEffect: React.FC<ConfettiProps> = ({
  trigger = false,
  duration = 3000,
  numberOfPieces = 200,
}) => {
  const [showConfetti, setShowConfetti] = useState(trigger);

  React.useEffect(() => {
    if (trigger) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!showConfetti) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <Confetti
        className='z-[100]'
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={numberOfPieces}
        recycle={true}
      />
    </div>
  );
};
