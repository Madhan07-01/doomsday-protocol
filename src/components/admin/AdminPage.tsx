import React, { useState, useEffect, useCallback } from 'react';
import { adminStore, AdminState } from '../../lib/adminStore';
import {
  Shield, Lock, Unlock, Eye, EyeOff, ToggleLeft, ToggleRight,
  Link, Play, RotateCcw, Terminal, ChevronRight, AlertTriangle,
  Zap, Flame, ShieldAlert, Clock,
} from 'lucide-react';

const ADMIN_PASSWORD = 'iloveyou3000';

// ─── Sub-components ──────────────────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  accent?: string;
  children: React.ReactNode;
}
const SectionCard: React.FC<SectionCardProps> = ({ title, icon, accent = '#427F40', children }) => (
  <div
    className="rounded-2xl bg-[#011d16]/90 backdrop-blur-sm p-5 space-y-4 border"
    style={{ borderColor: `${accent}80`, boxShadow: `0 0 20px ${accent}22` }}
  >
    <div className="flex items-center space-x-2 border-b pb-3" style={{ borderColor: `${accent}50` }}>
      <div style={{ color: accent }}>{icon}</div>
      <span className="text-xs font-corpta font-black uppercase tracking-widest" style={{ color: accent }}>
        {title}
      </span>
    </div>
    {children}
  </div>
);

interface ToggleRowProps {
  label: string;
  sublabel?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  accentOn?: string;
}
const ToggleRow: React.FC<ToggleRowProps> = ({
  label, sublabel, value, onChange, accentOn = '#427F40'
}) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <p className="text-xs font-corpta font-bold text-[#7D9AA3] uppercase tracking-wider">{label}</p>
      {sublabel && <p className="text-[10px] font-sans text-[#7D9AA3]/60 mt-0.5">{sublabel}</p>}
    </div>
    <button
      onClick={() => onChange(!value)}
      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-black uppercase tracking-widest transition-all"
      style={value
        ? { background: `${accentOn}22`, borderColor: accentOn, color: accentOn }
        : { background: '#01120e', borderColor: '#427F40', color: '#7D9AA3' }
      }
    >
      {value
        ? <><ToggleRight className="w-4 h-4" /><span>YES</span></>
        : <><ToggleLeft className="w-4 h-4" /><span>NO</span></>
      }
    </button>
  </div>
);

interface LinkInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  accent?: string;
}
const LinkInput: React.FC<LinkInputProps> = ({ label, placeholder, value, onChange, accent = '#427F40' }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>
      {label}
    </label>
    <div className="flex items-center space-x-2">
      <Link className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-[#01120e] border rounded-lg px-3 py-2 text-xs font-mono text-[#7D9AA3] placeholder-[#7D9AA3]/30 outline-none focus:ring-1 transition-all"
        style={{ borderColor: `${accent}60`, focusRingColor: accent } as React.CSSProperties}
        onFocus={(e) => (e.target.style.borderColor = accent)}
        onBlur={(e) => (e.target.style.borderColor = `${accent}60`)}
      />
    </div>
  </div>
);

// ─── Login Screen ─────────────────────────────────────────────────────────────

interface LoginProps {
  onSuccess: () => void;
}
const LoginScreen: React.FC<LoginProps> = ({ onSuccess }) => {
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError('ACCESS DENIED — INVALID CREDENTIALS');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPw('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#06120e] overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/doom-bg.webp')", filter: 'blur(2px) contrast(120%)' }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#06120e]/60 to-[#06120e] pointer-events-none" />
      {/* scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }}
      />

      <div
        className={`relative z-10 w-full max-w-md mx-4 rounded-2xl bg-[#011d16]/95 border-2 border-[#427F40] p-8 space-y-6 backdrop-blur-md shadow-[0_0_60px_rgba(66,127,64,0.4)] transition-all ${shake ? 'animate-[shake_0.5s_ease]' : ''}`}
        style={shake ? { animation: 'shake 0.5s' } : {}}
      >
        {/* Header */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#022C22] border-2 border-[#427F40] flex items-center justify-center shadow-[0_0_20px_rgba(66,127,64,0.6)]">
            <img src="/assets/brand/doom-emblem.webp" alt="Doom Emblem" className="w-10 h-10 object-contain" />
          </div>
          <div className="text-center">
            <h1 className="font-comic text-2xl font-black text-[#7D9AA3] tracking-wider">DOOMSDAY</h1>
            <p className="text-xs font-mono text-[#7D9AA3]/70 tracking-widest uppercase">Admin Console // Secure Access</p>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#022C22] border border-[#427F40]/60 text-[10px] font-mono text-[#7D9AA3] uppercase tracking-widest">
            <Shield className="w-3 h-3 text-[#427F40]" />
            <span>OPERATION D-DAY — CONTROL PANEL</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-[#427F40] uppercase tracking-widest">
              Authorization Code
            </label>
            <div className="flex items-center space-x-2 bg-[#01120e] border border-[#427F40]/60 rounded-xl px-3 py-2.5 focus-within:border-[#427F40] transition-all">
              <Lock className="w-4 h-4 text-[#427F40] flex-shrink-0" />
              <input
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(''); }}
                placeholder="Enter access code..."
                className="flex-1 bg-transparent text-sm font-mono text-[#7D9AA3] placeholder-[#7D9AA3]/30 outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="text-[#7D9AA3]/50 hover:text-[#7D9AA3] transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-900/20 border border-red-500/40 text-xs font-mono text-red-400 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-corpta font-black text-sm uppercase tracking-widest border border-[#7D9AA3] shadow-[0_0_20px_rgba(66,127,64,0.5)] transition-all transform hover:-translate-y-0.5"
          >
            <Unlock className="w-4 h-4 text-[#022C22]" />
            <span className="text-[#022C22]">AUTHENTICATE</span>
          </button>
        </form>

        <p className="text-center text-[10px] font-corpta text-[#7D9AA3]/40 uppercase tracking-wider">
          Restricted access — authorized personnel only
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
};

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [state, setState] = useState<AdminState>(adminStore.get());
  const [saved, setSaved] = useState(false);

  // Sync with store changes
  useEffect(() => {
    return adminStore.subscribe((s) => setState(s));
  }, []);

  const update = useCallback((partial: Partial<AdminState>) => {
    adminStore.set(partial);
    setState(adminStore.get());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, []);

  const handleStartTimer = () => {
    update({ timerStarted: true, timerStartedAt: Date.now() });
  };

  const handleResetTimer = () => {
    update({ timerStarted: false, timerStartedAt: null });
  };

  if (!authenticated) {
    return <LoginScreen onSuccess={() => setAuthenticated(true)} />;
  }

  // Compute seconds remaining for display
  let secondsRemaining = state.timerDurationMinutes * 60;
  if (state.timerStarted && state.timerStartedAt) {
    const elapsed = Math.floor((Date.now() - state.timerStartedAt) / 1000);
    secondsRemaining = Math.max(0, state.timerDurationMinutes * 60 - elapsed);
  }
  const timerH = Math.floor(secondsRemaining / 3600);
  const timerM = Math.floor((secondsRemaining % 3600) / 60);
  const timerS = secondsRemaining % 60;
  const timerDisplay = timerH > 0
    ? `${String(timerH).padStart(2, '0')}:${String(timerM).padStart(2, '0')}:${String(timerS).padStart(2, '0')}`
    : `${String(timerM).padStart(2, '0')}:${String(timerS).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#06120e] text-[#7D9AA3] overflow-y-auto">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/doom-bg.webp')" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#06120e]/80 via-transparent to-[#06120e] pointer-events-none" />
      {/* scanlines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-[#022C22] border-2 border-[#427F40] flex items-center justify-center shadow-[0_0_15px_rgba(66,127,64,0.5)]">
              <img src="/assets/brand/doom-emblem.webp" alt="" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="font-comic text-2xl font-black text-[#7D9AA3] tracking-wider leading-none">ADMIN CONSOLE</h1>
              <p className="text-[10px] font-mono text-[#7D9AA3]/60 uppercase tracking-widest">Operation D-Day • Control Panel</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {saved && (
              <span className="px-3 py-1 rounded-full bg-[#427F40]/20 border border-[#427F40] text-xs font-mono text-[#427F40] uppercase tracking-wider animate-fade-in">
                ✓ Saved
              </span>
            )}
            <button
              onClick={() => setAuthenticated(false)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#011d16] border border-[#427F40]/60 hover:border-red-500/60 text-[#7D9AA3]/70 hover:text-red-400 font-mono text-xs uppercase tracking-wider transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl bg-[#011d16]/80 border border-[#427F40]/40 text-[10px] font-mono text-[#7D9AA3]/70 uppercase tracking-wider">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#427F40] animate-ping inline-block" />
            <span>Live Control Active</span>
          </span>
          <span className="text-[#427F40]/40">|</span>
          <span>R1: {state.round1Enabled ? '✓ Open' : '✗ Locked'}</span>
          <span className="text-[#427F40]/40">|</span>
          <span>R2: {state.round2Enabled ? '✓ Open' : '✗ Locked'}</span>
          <span className="text-[#427F40]/40">|</span>
          <span>R3: {state.round3Enabled ? '✓ Open' : '✗ Locked'}</span>
          <span className="text-[#427F40]/40">|</span>
          <span>Timer: {state.timerStarted ? '▶ Running' : '■ Stopped'}</span>
        </div>

        {/* ── SECTION 1: Round Access ── */}
        <SectionCard title="Round Access Control" icon={<Shield className="w-4 h-4" />}>
          <div className="space-y-4">
            <ToggleRow
              label="Round 1 — Wanda Protocol (Quiz)"
              sublabel="Kahoot / Wayground quiz access for participants"
              value={state.round1Enabled}
              onChange={(v) => update({ round1Enabled: v })}
            />
            <div className="border-t border-[#427F40]/20" />
            <ToggleRow
              label="Round 2 — Strange Protocol (Debug)"
              sublabel="HackerRank debugging arena access"
              value={state.round2Enabled}
              onChange={(v) => update({ round2Enabled: v })}
              accentOn="#8B5CF6"
            />
            <div className="border-t border-[#427F40]/20" />
            <ToggleRow
              label="Round 3 — Doom Protocol (Arena)"
              sublabel="Final vibe coding arena access"
              value={state.round3Enabled}
              onChange={(v) => update({ round3Enabled: v })}
              accentOn="#F59E0B"
            />
          </div>
        </SectionCard>

        {/* ── SECTION 2: Round 1 Links ── */}
        <SectionCard
          title="Round 1 — Quiz Links (Wayground / Kahoot)"
          icon={<Flame className="w-4 h-4" />}
          accent="#FF1E56"
        >
          <LinkInput
            label="Quiz Join Link"
            placeholder="https://kahoot.it/challenge/..."
            value={state.round1QuizLink}
            onChange={(v) => update({ round1QuizLink: v })}
            accent="#FF1E56"
          />
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF1E56]">
              Room Code
            </label>
            <div className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-[#FF1E56]" />
              <input
                type="text"
                value={state.round1RoomCode}
                onChange={(e) => update({ round1RoomCode: e.target.value })}
                placeholder="e.g.  4567892"
                className="flex-1 bg-[#01120e] border border-[#FF1E56]/40 rounded-lg px-3 py-2 text-xs font-mono text-[#7D9AA3] placeholder-[#7D9AA3]/30 outline-none focus:border-[#FF1E56] transition-all"
              />
            </div>
          </div>
          {(state.round1QuizLink || state.round1RoomCode) && (
            <div className="px-3 py-2 rounded-lg bg-[#01120e] border border-[#FF1E56]/30 text-[10px] font-mono text-[#FF1E56]/80 space-y-0.5">
              <p className="uppercase font-bold tracking-wider">Preview (shown on R1 page):</p>
              {state.round1QuizLink && <p>Link: {state.round1QuizLink}</p>}
              {state.round1RoomCode && <p>Room Code: {state.round1RoomCode}</p>}
            </div>
          )}
        </SectionCard>

        {/* ── SECTION 3: Round 2 Links ── */}
        <SectionCard
          title="Round 2 — HackerRank Invite Link"
          icon={<ShieldAlert className="w-4 h-4" />}
          accent="#8B5CF6"
        >
          <LinkInput
            label="HackerRank Invite Link"
            placeholder="https://www.hackerrank.com/contests/..."
            value={state.round2HackerRankLink}
            onChange={(v) => update({ round2HackerRankLink: v })}
            accent="#8B5CF6"
          />
          {state.round2HackerRankLink && (
            <div className="px-3 py-2 rounded-lg bg-[#01120e] border border-[#8B5CF6]/30 text-[10px] font-mono text-[#8B5CF6]/80 space-y-0.5">
              <p className="uppercase font-bold tracking-wider">Preview (shown on R2 page):</p>
              <p>{state.round2HackerRankLink}</p>
            </div>
          )}
        </SectionCard>

        {/* ── SECTION 4: Round 3 Links ── */}
        <SectionCard
          title="Round 3 — Arena Link"
          icon={<Zap className="w-4 h-4" />}
          accent="#F59E0B"
        >
          <LinkInput
            label="Round 3 Arena / Submission Link (optional)"
            placeholder="https://..."
            value={state.round3Link}
            onChange={(v) => update({ round3Link: v })}
            accent="#F59E0B"
          />
        </SectionCard>

        {/* ── SECTION 5: Round 3 Problem Statement ── */}
        <SectionCard
          title="Round 3 — Problem Statement (Onspot Reveal)"
          icon={<Terminal className="w-4 h-4" />}
          accent="#F59E0B"
        >
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F59E0B]">
              Problem Statement Text
            </label>
            <textarea
              value={state.round3ProblemStatement}
              onChange={(e) => update({ round3ProblemStatement: e.target.value })}
              placeholder="Paste the problem statement here. This will be revealed live on the Round 3 page when the timer starts..."
              rows={6}
              className="w-full bg-[#01120e] border border-[#F59E0B]/40 rounded-xl px-3 py-2.5 text-xs font-mono text-[#7D9AA3] placeholder-[#7D9AA3]/30 outline-none focus:border-[#F59E0B] transition-all resize-none leading-relaxed"
            />
            <p className="text-[10px] font-mono text-[#7D9AA3]/50">
              This text appears in the Round 3 arena page when admin starts the timer.
            </p>
          </div>
        </SectionCard>

        {/* ── SECTION 6: Timer Control ── */}
        <SectionCard
          title="Round 3 — Doomsday Timer Control"
          icon={<Clock className="w-4 h-4" />}
          accent={state.timerStarted ? '#ef4444' : '#427F40'}
        >
          <div className="space-y-4">
            {/* Duration setting */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#427F40]">
                Timer Duration (minutes)
              </label>
              <div className="flex items-center space-x-3">
                {[30, 45, 60, 90, 120].map((m) => (
                  <button
                    key={m}
                    onClick={() => update({ timerDurationMinutes: m })}
                    disabled={state.timerStarted}
                    className="px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={state.timerDurationMinutes === m
                      ? { background: '#427F4033', borderColor: '#427F40', color: '#427F40' }
                      : { background: '#01120e', borderColor: '#427F4060', color: '#7D9AA3' }
                    }
                  >
                    {m}m
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={300}
                  value={state.timerDurationMinutes}
                  onChange={(e) => update({ timerDurationMinutes: Number(e.target.value) || 60 })}
                  disabled={state.timerStarted}
                  className="w-20 bg-[#01120e] border border-[#427F40]/60 rounded-lg px-2 py-1.5 text-xs font-mono text-[#7D9AA3] outline-none focus:border-[#427F40] transition-all disabled:opacity-40"
                />
              </div>
            </div>

            {/* Timer status display */}
            <div
              className="rounded-xl border p-4 flex items-center justify-between transition-all duration-500"
              style={state.timerStarted
                ? { background: '#01120e', borderColor: '#ef4444', boxShadow: '0 0 20px rgba(239,68,68,0.2)' }
                : { background: '#01120e', borderColor: '#427F4060' }
              }
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: state.timerStarted ? '#ef4444' : '#7D9AA3' }}>
                  {state.timerStarted ? '▶ TIMER RUNNING' : '■ TIMER NOT STARTED'}
                </p>
                {state.timerStarted && (
                  <p className="text-xs font-mono text-[#7D9AA3]/60 mt-0.5">
                    Started: {state.timerStartedAt ? new Date(state.timerStartedAt).toLocaleTimeString() : '—'}
                  </p>
                )}
              </div>
              <div
                className="font-mono font-black text-2xl tracking-widest"
                style={{ color: state.timerStarted ? '#ef4444' : '#427F40' }}
              >
                {timerDisplay}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {!state.timerStarted ? (
                <button
                  onClick={handleStartTimer}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-mono font-black text-xs uppercase tracking-widest border border-[#7D9AA3] shadow-[0_0_15px_rgba(66,127,64,0.5)] transition-all transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4 fill-current text-[#022C22]" />
                  <span className="text-[#022C22]">START TIMER</span>
                </button>
              ) : (
                <button
                  onClick={handleResetTimer}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#011d16] hover:bg-[#022C22] text-red-400 hover:text-red-300 font-mono font-black text-xs uppercase tracking-wider border border-red-500/50 hover:border-red-400 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET TIMER</span>
                </button>
              )}
              <p className="text-[10px] font-mono text-[#7D9AA3]/50 leading-snug">
                {state.timerStarted
                  ? 'Timer is live on participant screens. Reset to stop.'
                  : 'Starting timer will reveal PS on Round 3 page for all participants.'}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── Footer ── */}
        <div className="text-center text-[10px] font-mono text-[#7D9AA3]/30 uppercase tracking-wider pb-4">
          DOOMSDAY PROTOCOL • KRATOS '26 • ADMIN CONSOLE • RESTRICTED
        </div>
      </div>
    </div>
  );
};
