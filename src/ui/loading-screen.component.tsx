import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
  backgroundImage?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  progress = 0,
  backgroundImage
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly animate display progress toward actual progress
  useEffect(() => {
    if (progress > displayProgress) {
      const step = Math.max(1, Math.ceil((progress - displayProgress) / 5));
      const timer = setTimeout(() => {
        setDisplayProgress(prev => Math.min(prev + step, progress));
      }, 30);
      return () => clearTimeout(timer);
    } else if (progress < displayProgress) {
      setDisplayProgress(progress);
    }
  }, [progress, displayProgress]);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950"
      style={{
        zIndex: 9999,
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay that matches your game aesthetic */}
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-md"></div>

      {/* Container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-yellow-500 mb-2">
            SCRAMBLE WORDS
          </h1>
          <p className="text-yellow-500/60 text-sm tracking-widest">
            LOADING...
          </p>
        </div>

        {/* Loading Animation - Spinning Letters */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Rotating border */}
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>
          
          {/* Center text */}
          <div className="text-center">
            <p className="text-4xl font-bold text-yellow-500">
              {Math.round(displayProgress)}%
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64">
          <div className="bg-blue-900/50 border-2 border-yellow-500 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-yellow-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${displayProgress}%` }}
            ></div>
          </div>
          <p className="text-yellow-500/60 text-xs text-center mt-2">
            Preparing your game...
          </p>
        </div>

        {/* Loading dots animation */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s',
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simpler version without progress bar
export const SimpleLoadingScreen: React.FC<{ 
  isLoading: boolean;
  backgroundImage?: string;
}> = ({ isLoading, backgroundImage }) => {
  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950"
      style={{
        zIndex: 9999,
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay matching game aesthetic */}
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-yellow-500">
          SCRAMBLE WORDS
        </h1>
        
        {/* Rotating spinner */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>
        </div>

        <p className="text-yellow-500/70 text-sm tracking-widest animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
};

// Minimal version - just solid color overlay
export const MinimalLoadingScreen: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-950 z-50 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold text-yellow-500">
          SCRAMBLE WORDS
        </h1>
        
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>
        </div>

        <p className="text-yellow-500/70 text-sm tracking-widest animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
};
