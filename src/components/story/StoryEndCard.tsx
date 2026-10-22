import React from 'react';
import { RotateCcw, Home, ArrowLeft, Terminal, ShieldCheck, Sparkles, Flame, ShieldAlert, Zap } from 'lucide-react';
import { eventConfig } from '../../data/eventConfig';
import { soundFx } from '../../lib/soundFx';
import { GreenSmoke } from '../effects/GreenSmoke';

interface StoryEndCardProps {
  onReplayStory: () => void;
  onReturnToHub: () => void;
  onSelectRound: (roundId: string) => void;
  onPrev?: () => void;
}

export const StoryEndCard: React.FC<StoryEndCardProps> = ({
  onReplayStory,
  onReturnToHub,
  onSelectRound,
  onPrev,
}) => {
  return (
    <div className="fixed inset-0 flex flex-col bg-[#06120e] overflow-hidden">
      {/* Background Doctor Doom Atmospheric Backdrop - High Visibility */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-75 filter contrast-110 brightness-95 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/assets/images/doom-bg.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
      </div>

      {/* Live Video Smoke Effect blended as SCREEN */}
      <GreenSmoke className="absolute inset-0 pointer-events-none z-0 overflow-hidden" opacity={0.65} />

      {/* Main Content Area - non-scrollable */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-4 max-w-4xl mx-auto w-full text-center space-y-6 animate-fade-in">
        
        {/* Victory Emblem */}
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#022C22] border-2 border-[#427F40] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(66,127,64,0.6)] p-2">
            <img 
              src="/assets/brand/doom-emblem.webp" 
              alt="Doctor Doom Victory Emblem" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(66,127,64,0.7)]" 
            />
          </div>
          <div className="absolute -bottom-2 inset-x-0">
            <span className="px-3 py-1 rounded-full bg-[#427F40] text-[#022C22] font-mono text-[10px] font-black uppercase tracking-widest border border-[#7D9AA3]">
              OPERATION COMPLETE
            </span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2 text-xs font-corpta text-[#7D9AA3] font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#7D9AA3]" />
            <span>CANONICAL VICTORY RECORDED</span>
          </div>

          <h1 className="font-comic text-4xl sm:text-6xl font-black text-[#7D9AA3] tracking-wider">
            DOOMSDAY <span className="text-[#7D9AA3]">PROTOCOL</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#7D9AA3]/90 font-sans max-w-xl mx-auto leading-relaxed">
            The 30-scene saga has concluded: Wanda Maximoff&apos;s Chaos Hex was deciphered on Wayground, 
            Doctor Strange&apos;s cosmic conduit severed on HackerRank, and Doctor Doom&apos;s citadel dismantled.
          </p>
        </div>

        {/* Three Operations Shortcuts */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectRound('round-1');
            }}
            className="p-3 rounded-xl bg-[#011d16]/90 border border-[#427F40] hover:border-[#7D9AA3] transition-colors text-center group shadow-[3px_3px_0_#01120e]"
          >
            <div className="flex items-center justify-center mb-1 text-[#7D9AA3]">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-[10px] font-corpta text-[#7D9AA3] font-bold uppercase">
              R1 • WAYGROUND
            </div>
            <div className="font-comic text-sm text-[#7D9AA3] group-hover:text-white transition-colors">
              The Wanda Protocol
            </div>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onSelectRound('round-2');
            }}
            className="p-3 rounded-xl bg-[#011d16]/90 border border-[#427F40] hover:border-[#7D9AA3] transition-colors text-center group shadow-[3px_3px_0_#01120e]"
          >
            <div className="flex items-center justify-center mb-1 text-[#7D9AA3]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-[10px] font-corpta text-[#7D9AA3] font-bold uppercase">
              R2 • HACKERRANK
            </div>
            <div className="font-comic text-sm text-[#7D9AA3] group-hover:text-white transition-colors">
              The Strange Protocol
            </div>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onSelectRound('round-3');
            }}
            className="p-3 rounded-xl bg-[#011d16]/90 border border-[#427F40] hover:border-[#7D9AA3] transition-colors text-center group shadow-[3px_3px_0_#01120e]"
          >
            <div className="flex items-center justify-center mb-1 text-[#7D9AA3]">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-[10px] font-corpta text-[#7D9AA3] font-bold uppercase">
              R3 • LIVE ARENA
            </div>
            <div className="font-comic text-sm text-[#7D9AA3] group-hover:text-white transition-colors">
              The Doom Protocol
            </div>
          </button>
        </div>

        {/* Organizer details */}
        <div className="rounded-xl bg-[#011d16]/90 border border-[#427F40]/60 p-4 max-w-xl mx-auto space-y-1.5 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs font-corpta font-bold text-[#7D9AA3]">
            <Terminal className="w-3.5 h-3.5 text-[#7D9AA3]" />
            <span>KRATOS &apos;26 SYMPOSIUM ARENA</span>
          </div>
          <p className="text-[11px] text-[#7D9AA3]/80 font-sans">
            {eventConfig.organizerInfo.college} &bull; {eventConfig.organizerInfo.department}
          </p>
          <div className="flex items-center justify-center space-x-1 text-[10px] text-[#7D9AA3]/90 font-corpta pt-1 border-t border-[#427F40]/40">
            <ShieldCheck className="w-3 h-3 text-[#7D9AA3]" />
            <span>Battleworld Protocol &bull; Event Operations Active</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex-shrink-0 bg-[#022C22]/95 border-t border-[#427F40]/60 px-4 py-3 flex items-center justify-between backdrop-blur-md relative z-10">
        <button
          onClick={() => {
            soundFx.playClick();
            onReturnToHub();
          }}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white border border-[#427F40] text-xs font-corpta uppercase tracking-wider transition-all"
        >
          <Home className="w-3.5 h-3.5 text-[#7D9AA3]" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <div className="flex items-center space-x-2">
          {onPrev && (
            <button
              onClick={() => {
                soundFx.playWhoosh();
                onPrev();
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] border border-[#427F40] hover:border-[#7D9AA3] font-corpta text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#7D9AA3]" />
              <span className="hidden sm:inline">Prev Scene</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playWhoosh();
              onReplayStory();
            }}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-corpta text-xs font-black uppercase tracking-wider border border-[#7D9AA3] shadow-[0_0_15px_rgba(66,127,64,0.5)] transition-all"
          >
            <RotateCcw className="w-4 h-4 text-[#022C22]" />
            <span className="text-[#022C22]">Replay Story</span>
          </button>
        </div>
      </div>
    </div>
  );
};
