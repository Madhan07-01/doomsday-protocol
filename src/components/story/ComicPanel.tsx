import React, { useState } from 'react';
import { ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { ComicScene } from '../../data/storyboardData';

interface ComicPanelProps {
  scene: ComicScene;
  fullscreen?: boolean;
}

export const ComicPanel: React.FC<ComicPanelProps> = ({ scene, fullscreen }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(!scene.isEmptyPlaceholder);

  // If this is one of the 3 Doom Sequel empty placeholder pages requested by user
  if (scene.isEmptyPlaceholder) {
    return (
      <div className={`relative w-full ${fullscreen ? 'h-full' : 'aspect-video'} bg-[#06120e] flex flex-col items-center justify-center p-8 overflow-hidden select-none`}>
        {/* Ambient watermark backdrop - High Visibility */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 filter contrast-115 brightness-85 pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/doom-bg.webp')" }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/60 to-[#06120e] pointer-events-none" />

        {/* Empty Comic Frame */}
        <div className="relative z-10 w-full max-w-2xl aspect-[16/10] max-h-[75vh] rounded-2xl border-4 border-[#427F40] bg-[#011d16]/90 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_0_35px_rgba(66,127,64,0.4)]">
          <div className="w-20 h-20 rounded-full bg-[#022C22] border-2 border-[#427F40] p-2 flex items-center justify-center shadow-[0_0_20px_rgba(66,127,64,0.5)]">
            <ShieldAlert className="w-10 h-10 text-[#7D9AA3]" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-corpta uppercase tracking-[0.2em] text-[#7D9AA3]/80">
              {scene.chapterTitle} &bull; PART {scene.sceneNumber - 17}
            </span>
            <h3 className="font-comic text-3xl sm:text-4xl font-black text-[#7D9AA3] tracking-wider">
              SEQUEL OF DOOM
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#7D9AA3]/90 max-w-md pt-1">
              Classified intelligence &bull; Incoming transmission from the Latverian Citadel.
            </p>
          </div>

          <div className="px-4 py-1.5 rounded-full bg-[#022C22] border border-[#427F40] text-[10px] font-corpta text-[#7D9AA3] uppercase tracking-widest animate-pulse">
            AWAITING ARTWORK REVEAL
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${fullscreen ? 'h-full' : 'aspect-video'} bg-[#022C22] flex items-center justify-center overflow-hidden`}>
      {/* Main Comic Image */}
      {!hasError ? (
        <img
          key={scene.imagePath}
          src={scene.imagePath}
          alt={`Comic scene ${scene.refNumber}`}
          loading="eager"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        /* Fallback if image path missing */
        <div className="relative z-10 p-8 text-center max-w-md space-y-3 bg-[#011d16] border border-[#427F40] rounded-xl">
          <div className="w-14 h-14 rounded-xl bg-[#022C22] border border-[#427F40] text-[#7D9AA3] mx-auto flex items-center justify-center">
            <ImageIcon className="w-7 h-7 text-[#7D9AA3]" />
          </div>
          <h4 className="font-comic text-2xl font-bold text-[#7D9AA3] tracking-wider">
            SCENE REF {String(scene.refNumber).padStart(2, '0')}
          </h4>
          <div className="text-[11px] font-mono text-[#7D9AA3] bg-[#022C22] px-3 py-2 rounded border border-[#427F40]/50 break-all">
            {scene.imagePath}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#022C22] z-20">
          <div className="flex flex-col items-center space-y-3">
            <ImageIcon className="w-10 h-10 text-[#427F40] animate-pulse" />
            <span className="font-mono text-xs text-[#7D9AA3] uppercase tracking-widest">
              Loading Page...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
