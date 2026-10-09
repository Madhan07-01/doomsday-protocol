import React, { useEffect, useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComicScene } from '../../data/storyboardData';
import { soundFx } from '../../lib/soundFx';
import { ComicPanel } from './ComicPanel';

interface ComicReaderProps {
  currentScene: ComicScene;
  allScenes: ComicScene[];
  canGoPrev: boolean;
  canGoNext: boolean;
  onNext: () => void;
  onPrev: () => void;
  onJumpToScene: (sceneNumber: number) => void;
  onReturnToHub: () => void;
}

export const ComicReader: React.FC<ComicReaderProps> = ({
  currentScene,
  allScenes,
  canGoPrev,
  canGoNext,
  onNext,
  onPrev,
  onJumpToScene,
  onReturnToHub,
}) => {
  // Direction for 3D page flip: 1 = forward (turning right to left), -1 = backward (turning left to right)
  const [direction, setDirection] = useState<number>(1);

  // Trigger next with 3D flip and page-turn sound
  const handleNext = useCallback(() => {
    if (!canGoNext) return;
    setDirection(1);
    soundFx.playPageTurn();
    onNext();
  }, [canGoNext, onNext]);

  // Trigger prev with 3D flip and page-turn sound
  const handlePrev = useCallback(() => {
    if (!canGoPrev) return;
    setDirection(-1);
    soundFx.playPageTurn();
    onPrev();
  }, [canGoPrev, onPrev]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        soundFx.playClick();
        onReturnToHub();
      }
    },
    [handleNext, handlePrev, onReturnToHub]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 3D Realistic Comic Page Turn Variants
  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0.1,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      boxShadow: '0 0px 0px 0px rgba(0, 0, 0, 0)',
      transition: {
        duration: 0.42,
        ease: [0.25, 1, 0.5, 1] as const, // snappy paper flick curve
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.94,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
      transition: {
        duration: 0.38,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    }),
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#06120e] z-10 overflow-hidden select-none">
      
      {/* 3D Comic Book Stage with High Perspective */}
      <div 
        className="flex-1 relative overflow-hidden bg-[#06120e] flex items-center justify-center"
        style={{ perspective: 1800, transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentScene.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full absolute inset-0 flex items-center justify-center will-change-transform"
            style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
          >
            {/* Main Comic Image Panel */}
            <ComicPanel scene={currentScene} fullscreen />

            {/* Dynamic paper lighting & curl reflection */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{
                background: 'linear-gradient(105deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Bar — clean, non-scrollable, dots only (no 'page of') */}
      <div className="flex-shrink-0 bg-[#06120e]/95 border-t border-[#427F40]/60 px-4 py-3 flex items-center justify-between backdrop-blur-md relative z-30">
        
        {/* Home Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onReturnToHub();
          }}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white border border-[#427F40] hover:border-[#7D9AA3] text-xs font-corpta uppercase tracking-wider transition-all"
        >
          <Home className="w-3.5 h-3.5 text-[#7D9AA3]" />
          <span className="hidden sm:inline">Home</span>
        </button>

        {/* Paging Dots (Only dots, no 'page of' text) */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[50vw] py-1 scrollbar-none px-2">
          {allScenes.map((s) => {
            const isActive = s.sceneNumber === currentScene.sceneNumber;
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (s.sceneNumber !== currentScene.sceneNumber) {
                    setDirection(s.sceneNumber > currentScene.sceneNumber ? 1 : -1);
                    soundFx.playPageTurn();
                    onJumpToScene(s.sceneNumber);
                  }
                }}
                title={`Scene ${s.sceneNumber}`}
                className={`h-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                  isActive
                    ? 'w-6 bg-[#427F40] shadow-[0_0_10px_#427F40] border border-[#7D9AA3]'
                    : 'w-2 bg-[#011d16] border border-[#427F40]/50 hover:bg-[#427F40]/60'
                }`}
              />
            );
          })}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-corpta text-xs font-bold uppercase tracking-wider transition-all ${
              canGoPrev
                ? 'bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] border border-[#427F40] hover:border-[#7D9AA3]'
                : 'bg-[#022C22] text-[#7D9AA3]/30 border border-[#01120e] cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-[#7D9AA3]" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-corpta text-xs font-black uppercase tracking-wider border border-[#7D9AA3] shadow-[0_0_15px_rgba(66,127,64,0.5)] transition-all ${
              canGoNext ? '' : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <span className="hidden sm:inline text-[#022C22]">Next</span>
            <ArrowRight className="w-4 h-4 text-[#022C22]" />
          </button>
        </div>
      </div>
    </div>
  );
};
