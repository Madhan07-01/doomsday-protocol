import React, { useState, useEffect, useRef } from 'react';
import { Home, ArrowLeft, Zap, Lock, Clock } from 'lucide-react';
import { soundFx } from '../../lib/soundFx';
import { GreenSmoke } from '../effects/GreenSmoke';
import { adminStore, AdminState } from '../../lib/adminStore';

interface Round3ArenaProps {
  onContinueStory?: () => void;
  onReturnToHub: () => void;
  onPrev: () => void;
}

export const Round3Arena: React.FC<Round3ArenaProps> = ({
  onReturnToHub,
  onPrev,
}) => {
  const [adminState, setAdminState] = useState<AdminState>(adminStore.get());
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Subscribe to admin state changes
  useEffect(() => {
    const unsubscribe = adminStore.subscribe((s) => {
      setAdminState(s);
    });
    return unsubscribe;
  }, []);

  // Compute seconds left from admin-set start time
  useEffect(() => {
    const computeSecondsLeft = () => {
      const state = adminStore.get();
      const totalSeconds = state.timerDurationMinutes * 60;
      if (!state.timerStarted || !state.timerStartedAt) {
        return totalSeconds;
      }
      const elapsed = Math.floor((Date.now() - state.timerStartedAt) / 1000);
      return Math.max(0, totalSeconds - elapsed);
    };

    setSecondsLeft(computeSecondsLeft());

    if (adminState.timerStarted && adminState.timerStartedAt) {
      setTimerRunning(true);
      // Update every second
      intervalRef.current = window.setInterval(() => {
        const remaining = computeSecondsLeft();
        setSecondsLeft(remaining);
        if (remaining <= 0) {
          setTimerRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 1000);
    } else {
      setTimerRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [adminState.timerStarted, adminState.timerStartedAt, adminState.timerDurationMinutes]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const totalDuration = adminState.timerDurationMinutes * 60;
  const elapsed = totalDuration - secondsLeft;
  const progressPercent = (elapsed / totalDuration) * 100;

  const isDanger = secondsLeft <= 300 && timerRunning; // last 5 minutes
  const isExpired = secondsLeft === 0 && adminState.timerStarted;
  const isAccessEnabled = adminState.round3Enabled;
  const timerStarted = adminState.timerStarted;
  const problemStatement = adminState.round3ProblemStatement;

  const glowColor = isExpired
    ? 'drop-shadow-[0_0_30px_rgba(239,68,68,0.9)]'
    : isDanger
    ? 'drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]'
    : 'drop-shadow-[0_0_20px_rgba(66,127,64,0.8)]';

  return (
    <div className="fixed inset-0 flex flex-col bg-[#06120e] overflow-hidden">
      {/* Doomsday movie background backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/assets/images/doom-bg.webp')",
          opacity: timerRunning ? 0.85 : 0.75,
          filter: isDanger ? 'hue-rotate(300deg) contrast(130%) brightness(85%)' : 'contrast(115%) brightness(95%)',
          transition: 'opacity 1s, filter 2s',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: isDanger
            ? 'radial-gradient(ellipse at center, rgba(239,68,68,0.1) 0%, rgba(0,0,0,0.9) 75%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.85) 80%)',
        }}
      />

      {/* Live Video Smoke Effect */}
      <GreenSmoke className="absolute inset-0 pointer-events-none z-0 overflow-hidden" opacity={timerRunning ? 0.75 : 0.55} />

      {/* Retro-futuristic scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-4 space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full animate-fade-in">

        {/* Header badge */}
        <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#011d16] border ${isDanger ? 'border-red-500/60 text-red-400' : 'border-[#427F40] text-[#7D9AA3]'} text-xs font-corpta font-bold tracking-widest uppercase transition-colors duration-1000`}>
          <Zap className="w-4 h-4 text-[#7D9AA3]" />
          <span>ROUND 03 // CITADEL SHATTER // FINAL LEVEL</span>
        </div>

        {/* Round title */}
        <div className="text-center space-y-1">
          <h1 className="font-comic text-3xl sm:text-5xl font-black text-[#7D9AA3] tracking-wider">
            THE DOOM PROTOCOL
          </h1>
          <p className={`text-xs sm:text-sm font-corpta font-bold ${isDanger ? 'text-red-400' : 'text-[#7D9AA3]'} tracking-widest uppercase transition-colors duration-1000`}>
            Build. Innovate. End the Apocalypse.
          </p>
        </div>

        {/* Round locked state */}
        {!isAccessEnabled ? (
          <div className="w-full max-w-2xl rounded-2xl bg-[#011d16]/95 border-2 border-red-500/30 p-8 flex flex-col items-center space-y-3 backdrop-blur-sm">
            <Lock className="w-8 h-8 text-red-400/50" />
            <p className="text-xs font-corpta text-red-400/80 uppercase tracking-widest font-bold">Round Locked</p>
            <p className="text-[11px] font-corpta text-[#7D9AA3]/50 text-center">
              Stand by for organizer authorization. Round 3 access will be enabled when the time comes.
            </p>
          </div>
        ) : (
          <>
            {/* Problem statement card */}
            <div className={`w-full max-w-2xl rounded-2xl bg-[#011d16]/95 border-2 ${isDanger ? 'border-red-500/60' : 'border-[#427F40]'} p-4 sm:p-5 space-y-2 backdrop-blur-sm transition-colors duration-1000 shadow-[0_0_20px_rgba(66,127,64,0.3)]`}>
              <div className="flex items-center space-x-2 text-xs font-corpta font-bold uppercase text-[#7D9AA3] border-b border-[#427F40]/50 pb-1.5">
                <span className={`w-2 h-2 rounded-full ${timerRunning ? 'bg-red-500 animate-ping' : 'bg-[#427F40]'}`} />
                <span>PROBLEM STATEMENT REVEAL</span>
              </div>
              <div className="text-xs sm:text-sm font-sans text-[#7D9AA3] leading-relaxed space-y-1.5">
                <p className="text-[#7D9AA3] font-corpta font-bold">MISSION OBJECTIVE:</p>

                {timerStarted && problemStatement ? (
                  // Admin has started timer & pasted PS — show it
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-[#7D9AA3]/90 whitespace-pre-wrap leading-relaxed">
                      {problemStatement}
                    </p>
                  </div>
                ) : timerStarted && !problemStatement ? (
                  // Timer started but no PS pasted
                  <p className="text-xs sm:text-sm text-[#7D9AA3]/90">
                    Doctor Doom stands fortified in the Latverian Central Citadel. Teams must leverage
                    rapid AI-assisted vibe coding to develop and present an application solving the revealed challenge.
                  </p>
                ) : (
                  // Timer not started — PS sealed
                  <div className="flex flex-col items-center space-y-2 py-3">
                    <Lock className="w-5 h-5 text-[#7D9AA3]/40" />
                    <p className="text-xs font-corpta text-[#7D9AA3]/60 uppercase tracking-widest">
                      Problem Statement Sealed
                    </p>
                    <p className="text-[11px] font-corpta text-[#7D9AA3]/40 text-center">
                      The problem statement will be revealed when the organizer starts the timer.
                    </p>
                  </div>
                )}

                <div className="p-2.5 bg-[#022C22]/90 rounded-lg border border-[#427F40]/40 text-[11px] text-[#7D9AA3]/80 space-y-0.5">
                  <p className="text-[#7D9AA3] font-bold uppercase tracking-wider">Round Specifications:</p>
                  <p>&bull; Problem statement is formally unsealed by the jury as the timer begins</p>
                  <p>&bull; Full AI dev tooling, prompting, and rapid frameworks authorized</p>
                  <p>&bull; Judged on: functional execution, UI/UX polish, resilience, presentation</p>
                </div>
              </div>
            </div>

            {/* DOOMSDAY COUNTDOWN TIMER DISPLAY */}
            <div
              className={`w-full max-w-2xl rounded-2xl bg-[#011d16]/95 border-2 ${isDanger ? 'border-red-500' : 'border-[#427F40]'} p-4 sm:p-6 flex flex-col items-center space-y-3 transition-all duration-1000`}
              style={{
                boxShadow: isDanger
                  ? '0 0 40px rgba(239,68,68,0.4), inset 0 0 60px rgba(239,68,68,0.05)'
                  : '0 0 30px rgba(66,127,64,0.35), inset 0 0 40px rgba(66,127,64,0.08)',
              }}
            >
              {/* Timer status badge */}
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#7D9AA3]">
                <div className={`w-2 h-2 rounded-full ${timerRunning ? (isDanger ? 'bg-red-500 animate-ping' : 'bg-[#427F40] animate-ping') : 'bg-[#7D9AA3]/40'}`} />
                <span>
                  {isExpired
                    ? '⚠ TIME EXPIRED'
                    : timerRunning
                    ? 'DOOMSDAY COUNTDOWN ACTIVE'
                    : timerStarted
                    ? 'COUNTDOWN COMPLETE'
                    : 'DOOMSDAY TIMER (STANDBY)'}
                </span>
              </div>

              {!timerStarted ? (
                // Timer not yet started by admin
                <div className="flex flex-col items-center space-y-2 py-2">
                  <Clock className="w-10 h-10 text-[#427F40]/50" />
                  <p className="text-xs font-mono text-[#7D9AA3]/60 uppercase tracking-widest">
                    Awaiting organizer to start timer
                  </p>
                  <p className="text-[10px] font-mono text-[#7D9AA3]/40 text-center">
                    {adminState.timerDurationMinutes}:00 • The countdown will begin when the round officially starts.
                  </p>
                </div>
              ) : (
                <>
                  {/* Large digital numbers */}
                  <div
                    className={`font-mono font-black tracking-[0.15em] filter ${glowColor} transition-all duration-500`}
                    style={{
                      fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                      color: isExpired ? '#ef4444' : isDanger ? '#f87171' : '#7D9AA3',
                      WebkitTextStroke: isExpired ? '2px #dc2626' : isDanger ? '2px #b91c1c' : '2px #427F40',
                      paintOrder: 'stroke fill',
                      fontVariantNumeric: 'tabular-nums',
                      textShadow: isDanger
                        ? '0 0 30px rgba(239,68,68,0.8)'
                        : '0 0 20px rgba(66,127,64,0.7)',
                    }}
                  >
                    {hours > 0
                      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-[#01120e] rounded-full overflow-hidden border border-[#427F40]/50">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${progressPercent}%`,
                        background: isDanger
                          ? 'linear-gradient(to right, #ef4444, #dc2626)'
                          : 'linear-gradient(to right, #427F40, #7D9AA3)',
                        boxShadow: isDanger ? '0 0 8px rgba(239,68,68,0.8)' : '0 0 8px rgba(66,127,64,0.7)',
                      }}
                    />
                  </div>
                </>
              )}

              {isExpired && (
                <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-widest animate-pulse">
                  ⚠ BATTLEWORLD PROTOCOL BREACHED — SUBMIT NOW
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Bottom navigation bar */}
      <div className="flex-shrink-0 bg-[#022C22]/95 border-t border-[#427F40]/60 px-4 py-3 flex items-center justify-between backdrop-blur-md relative z-20">
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

          <div className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#011d16] border border-[#427F40] text-[11px] font-corpta font-bold tracking-widest uppercase text-[#7D9AA3]">
            <span className="w-2 h-2 rounded-full bg-[#427F40] animate-ping" />
            <span>FINAL LEVEL // END OF PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
