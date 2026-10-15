import React, { useState, useEffect } from 'react';
import { Home, ArrowRight, ArrowLeft, ExternalLink, Flame, ShieldAlert, Zap, Timer, Lock } from 'lucide-react';
import { RoundInfo } from '../../types/story';
import { soundFx } from '../../lib/soundFx';
import { GreenSmoke } from '../effects/GreenSmoke';
import { adminStore, AdminState } from '../../lib/adminStore';

interface RoundSetupProps {
  round: RoundInfo;
  onContinueStory: () => void;
  onReturnToHub: () => void;
  onPrev: () => void;
}

export const RoundSetup: React.FC<RoundSetupProps> = ({
  round,
  onContinueStory,
  onReturnToHub,
  onPrev,
}) => {
  const [adminState, setAdminState] = useState<AdminState>(adminStore.get());

  useEffect(() => {
    return adminStore.subscribe(setAdminState);
  }, []);

  const getTheme = () => {
    switch (round.id) {
      case 'round-1':
        return {
          icon: Flame,
          badge: 'ROUND 01 // CHAOS HEX BREACH',
          platformLabel: 'WAYGROUND',
          platformDesc: 'Quiz platform powered by Wayground. On event day, the live arena link will be activated below.',
        };
      case 'round-2':
        return {
          icon: ShieldAlert,
          badge: 'ROUND 02 // ASTRAL SIPHON SEVER',
          platformLabel: 'HACKERRANK',
          platformDesc: 'Debugging arena powered by HackerRank. The live challenge link will be activated on event day.',
        };
      case 'round-3':
        return {
          icon: Zap,
          badge: 'ROUND 03 // CITADEL SHATTER',
          platformLabel: 'LIVE ARENA',
          platformDesc: '',
        };
      default:
        return {
          icon: Flame,
          badge: 'ROUND OPERATIONS',
          platformLabel: '',
          platformDesc: '',
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  // Determine round access and links from admin state
  const isAccessEnabled =
    round.id === 'round-1' ? adminState.round1Enabled :
    round.id === 'round-2' ? adminState.round2Enabled :
    adminState.round3Enabled;

  // Resolve admin-posted external link
  const adminLink =
    round.id === 'round-1' ? adminState.round1QuizLink :
    round.id === 'round-2' ? adminState.round2HackerRankLink :
    adminState.round3Link;

  const effectiveUrl = adminLink || round.externalUrl || '';

  return (
    <div className="fixed inset-0 flex flex-col bg-[#06120e] overflow-hidden">
      {/* Background doctor doom - High-Visibility Artwork */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75 filter contrast-110 brightness-95 pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/doom-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/80 to-black/90 pointer-events-none" />

      {/* Live Video Smoke Effect blended as SCREEN */}
      <GreenSmoke className="absolute inset-0 pointer-events-none z-0 overflow-hidden" opacity={0.55} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto w-full space-y-6 sm:space-y-8 animate-fade-in">

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#011d16] border border-[#427F40] text-xs font-corpta font-bold tracking-widest uppercase text-[#7D9AA3]">
          <Icon className="w-4 h-4 text-[#7D9AA3]" />
          <span>{theme.badge}</span>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="font-comic text-4xl sm:text-6xl font-black text-[#7D9AA3] tracking-wider">
            {round.title}
          </h1>
          <p className="text-base sm:text-lg font-corpta font-bold text-[#7D9AA3] tracking-wide">
            {round.subtitle}
          </p>
        </div>

        {/* Platform access box */}
        <div className="w-full rounded-2xl bg-[#011d16]/90 border-2 border-[#427F40] p-6 sm:p-8 space-y-5 shadow-[0_0_20px_rgba(66,127,64,0.4)] backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isAccessEnabled ? 'bg-[#427F40] animate-ping' : 'bg-red-500/60'}`} />
            <span className="text-xs font-corpta font-bold text-[#7D9AA3] uppercase tracking-widest">
              PLATFORM: <span className="text-[#7D9AA3] underline decoration-[#427F40]">{theme.platformLabel}</span>
            </span>
            {!isAccessEnabled && (
              <span className="ml-auto flex items-center space-x-1 text-[10px] font-corpta text-red-400/80 uppercase tracking-wider">
                <Lock className="w-3 h-3" />
                <span>Access Locked</span>
              </span>
            )}
          </div>

          {round.id !== 'round-3' && (
            <p className="text-sm font-sans text-[#7D9AA3]/90 leading-relaxed">
              {theme.platformDesc}
            </p>
          )}

          {/* Room code for round 1 */}
          {round.id === 'round-1' && adminState.round1RoomCode && isAccessEnabled && (
            <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#022C22]/80 border border-[#427F40]/60">
              <span className="text-xs font-corpta text-[#7D9AA3]/70 uppercase tracking-wider">Room Code:</span>
              <span className="text-2xl font-mono font-black text-[#7D9AA3] tracking-[0.3em]">
                {adminState.round1RoomCode}
              </span>
            </div>
          )}

          {/* External link / placeholder */}
          {isAccessEnabled && effectiveUrl ? (
            <a
              href={effectiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-corpta font-black text-sm uppercase tracking-widest border border-[#7D9AA3] transition-all shadow-[0_0_20px_rgba(66,127,64,0.5)]"
            >
              <ExternalLink className="w-4 h-4 text-[#022C22]" />
              <span className="text-[#022C22]">Enter Arena — {theme.platformLabel}</span>
            </a>
          ) : isAccessEnabled ? (
            <div className="w-full flex flex-col items-center space-y-3 px-6 py-6 rounded-xl bg-[#022C22]/90 border border-[#427F40]/50 border-dashed">
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-[#7D9AA3]" />
                <span className="text-xs font-corpta text-[#7D9AA3] uppercase tracking-widest font-bold">
                  LINK ACTIVATES ON EVENT DAY
                </span>
              </div>
              <span className="text-[11px] font-corpta text-[#7D9AA3]/80 uppercase tracking-wider text-center">
                Arena credentials will be broadcast live at the symposium.<br />
                This placeholder will be replaced with the live URL.
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-3 px-6 py-6 rounded-xl bg-red-900/10 border border-red-500/30 border-dashed">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-red-400/60" />
                <span className="text-xs font-corpta text-red-400/80 uppercase tracking-widest font-bold">
                  ROUND LOCKED
                </span>
              </div>
              <span className="text-[11px] font-corpta text-red-400/60 uppercase tracking-wider text-center">
                Access to this round has not been unlocked yet.<br />
                Stand by for instructions from the event organizers.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="flex-shrink-0 bg-[#022C22]/95 border-t border-[#427F40]/60 px-4 py-3 flex items-center justify-between backdrop-blur-md relative z-10">
        <button
          onClick={() => {
            soundFx.playClick();
            onReturnToHub();
          }}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white border border-[#427F40] text-xs font-corpta uppercase tracking-wider transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              soundFx.playPageTurn();
              onPrev();
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] border border-[#427F40] hover:border-[#7D9AA3] font-corpta text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={() => {
              soundFx.playPageTurn();
              onContinueStory();
            }}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-corpta text-xs font-black uppercase tracking-wider border border-[#7D9AA3] shadow-[0_0_15px_rgba(66,127,64,0.5)] transition-all"
          >
            <span className="hidden sm:inline text-[#022C22]">Continue Story</span>
            <ArrowRight className="w-4 h-4 text-[#022C22]" />
          </button>
        </div>
      </div>
    </div>
  );
};
