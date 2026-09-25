import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GreenSmokeProps {
  className?: string;
  opacity?: number;
}

export const GreenSmoke: React.FC<GreenSmokeProps> = ({
  className = 'fixed inset-0 pointer-events-none z-[1] overflow-hidden',
  opacity = 0.65,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled
      });
    }
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={className} aria-hidden="true">
      {/* High-Fidelity Cinematic Smoke Video blended as SCREEN */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        src="/assets/videos/smoke-effect.mp4"
        className="w-full h-full object-cover mix-blend-screen pointer-events-none will-change-transform"
        style={{
          mixBlendMode: 'screen',
          opacity,
        }}
      />
    </div>
  );
};
