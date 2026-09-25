import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DoomTransitionProps {
  transitionKey: string | number;
}

export const DoomTransition: React.FC<DoomTransitionProps> = ({ transitionKey }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    setIsActive(true);
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [transitionKey, prefersReducedMotion]);

  if (!isActive || prefersReducedMotion) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden" 
      aria-hidden="true"
    >
      {/* Energy Flash Curtain */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#022C22]/95 via-[#427F40]/50 to-[#022C22]/95 backdrop-blur-md animate-doom-wipe" />
      
      {/* Scanline Beam */}
      <div className="absolute inset-x-0 h-1 bg-[#427F40] shadow-[0_0_20px_#427F40] animate-pulse" style={{ top: '50%' }} />

      {/* Latverian Protocol Glyph Reveal Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-6 py-2.5 rounded-lg bg-[#011d16] border border-[#427F40] text-[#7D9AA3] font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(66,127,64,0.6)] animate-pulse">
          DOOMSDAY PROTOCOL // TRANSITIONING
        </div>
      </div>
    </div>
  );
};
