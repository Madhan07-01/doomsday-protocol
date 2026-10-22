import React from 'react';
import { Play, Film } from 'lucide-react';
import { soundFx } from '../../lib/soundFx';
import { GreenSmoke } from '../effects/GreenSmoke';

interface StoryHubProps {
  onEnterRound?: (roundId: string) => void;
  onReadScene: (sceneNumber: number) => void;
  onReplayIntro?: () => void;
  visitedScenes: number[];
}

export const StoryHub: React.FC<StoryHubProps> = ({
  onEnterRound: _onEnterRound,
  onReadScene,
  onReplayIntro,
  visitedScenes,
}) => {
  const completionPercentage = Math.round((visitedScenes.length / 20) * 100);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-4 py-6 overflow-hidden bg-[#06120e]">
      {/* Subtle ambient background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#427F40]/10 via-transparent to-transparent pointer-events-none" />

      {/* Doctor Doom backdrop - High-Visibility Artwork */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 filter contrast-110 brightness-95 pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/doom-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />

      {/* Live Video Smoke Effect blended as SCREEN */}
      <GreenSmoke className="absolute inset-0 pointer-events-none z-0 overflow-hidden" opacity={0.65} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center space-y-4 sm:space-y-6 animate-fade-in">

        {/* Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#022C22] border-2 border-[#427F40] p-1 shadow-[0_0_20px_rgba(66,127,64,0.6)] flex items-center justify-center">
          <img
            src="/assets/brand/doom-emblem.webp"
            alt="Doctor Doom Emblem"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title / Brand Logo - 2X Size */}
        <div className="flex flex-col items-center space-y-2 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl px-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#011d16] border border-[#427F40] text-xs font-corpta text-[#7D9AA3] tracking-wider uppercase shadow-[0_0_10px_rgba(66,127,64,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#427F40] animate-ping" />
            <span>OPERATION D-DAY // SECURITY LEVEL: OMEGA</span>
          </div>

          <div className="relative w-full flex items-center justify-center py-2">
            <img
              src="/assets/brand/doomsday_protocol_exact.svg"
              alt="Doomsday Protocol"
              className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl max-h-64 sm:max-h-72 md:max-h-80 lg:max-h-[320px] object-contain filter drop-shadow-[0_12px_35px_rgba(66,127,64,0.65)]"
            />
          </div>

          <div className="flex items-center justify-center">
            <span className="px-3.5 py-1 bg-[#427F40] text-[#022C22] font-black font-corpta text-xs sm:text-sm rounded transform -rotate-2 shadow-[2px_2px_0_#011d16] border border-[#7D9AA3]">
              KRATOS '26
            </span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              soundFx.playWhoosh();
              onReadScene(1);
            }}
            className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-xl bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-corpta font-black text-sm tracking-widest uppercase shadow-[4px_4px_0_#01120e] border border-[#7D9AA3] transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-current text-[#022C22]" />
            <span className="text-[#022C22]">Begin Story</span>
          </button>

          {onReplayIntro && (
            <button
              onClick={() => {
                soundFx.playClick();
                onReplayIntro();
              }}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white font-corpta text-xs tracking-wider uppercase border border-[#427F40] hover:border-[#7D9AA3] transition-colors"
            >
              <Film className="w-3.5 h-3.5 text-[#7D9AA3]" />
              <span>Intro Video</span>
            </button>
          )}
        </div>

        {/* Progress indicator */}
        {visitedScenes.length > 0 && (
          <div className="flex flex-col items-center space-y-1 w-full max-w-xs">
            <span className="text-[10px] font-corpta text-[#7D9AA3] uppercase tracking-wider">
              INTEL REVEALED: <span className="text-[#7D9AA3] font-bold">{visitedScenes.length} / 20</span> SCENES ({completionPercentage}%)
            </span>
            <div className="w-full h-1.5 bg-[#01120e] rounded-full overflow-hidden border border-[#427F40]/60">
              <div
                className="h-full bg-gradient-to-r from-[#427F40] to-[#7D9AA3] shadow-[0_0_8px_#427F40] transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Organizer footnote */}
        <div className="text-[10px] font-corpta text-[#7D9AA3]/60 uppercase tracking-wider">
          DOOMSDAY PROTOCOL • KRATOS '26 ARENA
        </div>
      </div>
    </div>
  );
};
