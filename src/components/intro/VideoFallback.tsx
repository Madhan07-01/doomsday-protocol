import React from 'react';
import { ArrowRight, AlertTriangle, ShieldAlert } from 'lucide-react';
import { eventConfig } from '../../data/eventConfig';
import { soundFx } from '../../lib/soundFx';

interface VideoFallbackProps {
  onComplete: () => void;
  errorMessage?: string;
}

export const VideoFallback: React.FC<VideoFallbackProps> = ({
  onComplete,
  errorMessage,
}) => {
  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[560px] rounded-xl overflow-hidden border-2 border-doom-emerald/60 bg-doom-950 flex flex-col justify-between p-6 sm:p-10 shadow-comic-green">
      
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 opacity-35 bg-center bg-cover filter contrast-125 brightness-90"
        style={{ backgroundImage: `url('/assets/images/doom-bg.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-doom-950 via-doom-950/80 to-transparent" />
      <div className="absolute inset-0 bg-halftone bg-halftone opacity-15" />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs uppercase tracking-wider bg-black/70 px-3 py-1.5 rounded border border-doom-emerald/50">
          <AlertTriangle className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Cinematic Feed // Cloudflare R2 Buffer</span>
        </div>
        <div className="text-[11px] font-mono text-emerald-400/80">
          STATUS: RESISTANCE FALLBACK ACTIVE
        </div>
      </div>

      {/* Center Cinematic Message */}
      <div className="relative z-10 max-w-2xl my-auto py-8">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-doom-emerald/20 border border-doom-emerald/60 text-doom-emerald font-mono text-xs font-bold mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>SECURITY ADVISORY: OPERATION D-DAY</span>
        </div>
        <h2 className="font-comic text-3xl sm:text-5xl font-black text-white tracking-wider mb-4 leading-tight">
          EARTH HAS FALLEN. <br/>
          <span className="text-doom-emerald">BATTLEWORLD</span> IS LIVE.
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
          The 500 MB high-resolution cinematic prologue is configured to stream from Cloudflare R2.
          {errorMessage && (
            <span className="block mt-2 text-xs font-mono text-emerald-300/80">
              Note: {errorMessage}
            </span>
          )}
          {' '}You can bypass video buffering and jump directly into the 30-scene interactive comic novel and round challenges.
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            soundFx.playWhoosh();
            onComplete();
          }}
          className="inline-flex items-center space-x-3 px-6 py-3.5 rounded-lg bg-doom-emerald hover:bg-emerald-400 text-doom-950 font-mono font-black tracking-wider uppercase text-sm shadow-comic-green hover:shadow-toxic-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Bypass Video &amp; Enter Story Hub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-slate-400 border-t border-doom-800/80 pt-4 gap-2">
        <div>
          TARGET R2 SOURCE: <code className="text-emerald-300">{eventConfig.introVideoUrl}</code>
        </div>
        <div className="text-emerald-400/80">
          All 30 comic scenes available immediately
        </div>
      </div>
    </div>
  );
};
