import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Home } from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, sceneNum?: number) => void;
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onReplayIntro: _onReplayIntro,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.isMuted());

  useEffect(() => {
    setIsMuted(soundFx.isMuted());
  }, []);

  const handleToggleSound = () => {
    const next = soundFx.toggleMute();
    setIsMuted(next);
    soundFx.playClick();
  };

  // Don't show navbar in reader/round views — those have their own bottom nav
  const hideNavbarViews = ['reader', 'round-1', 'round-2', 'round-3', 'round-3-arena', 'intro'];
  if (hideNavbarViews.includes(currentView)) return null;

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Brand / Logo — clicking always goes home */}
        <button
          onClick={() => {
            soundFx.playClick();
            onNavigate('hub');
          }}
          className="flex items-center space-x-3 group text-left focus:outline-none focus:ring-2 focus:ring-[#427F40] rounded-md p-1"
          aria-label="Go to Home"
        >
          <div className="w-9 h-9 rounded-full bg-[#022C22] border border-[#427F40] flex items-center justify-center shadow-[0_0_10px_rgba(66,127,64,0.4)] group-hover:border-[#7D9AA3] group-hover:scale-105 transition-all overflow-hidden p-0.5">
            <img src="/assets/brand/doom-emblem.webp" alt="Doom Emblem" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-comic text-lg font-bold tracking-wider text-[#7D9AA3] group-hover:text-white transition-colors">
                DOOMSDAY
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-corpta font-black uppercase bg-[#427F40] text-[#082922] rounded tracking-widest border border-[#7D9AA3]/60 shadow-sm">
                KRATOS '26
              </span>
            </div>
            <span className="text-[10px] font-corpta tracking-widest text-[#7D9AA3]/80">
              OPERATION D-DAY
            </span>
          </div>
        </button>

        {/* Right side — Home button + audio toggle */}
        <div className="flex items-center space-x-2">
          {currentView !== 'hub' && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigate('hub');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#06201a] border border-[#427F40] hover:border-[#7D9AA3] text-[#7D9AA3] hover:text-white text-xs font-corpta uppercase tracking-wider transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#7D9AA3]" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            title={isMuted ? 'Sound is Muted' : 'Sound is Active'}
            className={`p-2 rounded-md border transition-all ${
              isMuted
                ? 'bg-[#06201a] border-[#427F40]/50 text-[#7D9AA3]/50 hover:text-[#7D9AA3]'
                : 'bg-[#0a2e26] border-[#427F40] text-[#7D9AA3] shadow-[0_0_10px_rgba(66,127,64,0.4)]'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#7D9AA3]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
