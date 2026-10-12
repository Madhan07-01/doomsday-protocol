import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  RotateCcw,
  Loader2,
  Maximize,
  Minimize,
  Radio,
  ArrowRight,
} from 'lucide-react';
import { eventConfig } from '../../data/eventConfig';
import { soundFx } from '../../lib/soundFx';

interface IntroVideoPlayerProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const IntroVideoPlayer: React.FC<IntroVideoPlayerProps> = ({
  onComplete,
  onSkip,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.isMuted());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requiresUserGesture, setRequiresUserGesture] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const controlsTimeoutRef = useRef<number | null>(null);

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Show and auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3500);
  }, []);

  // Try to start playback (handles browser unmuted autoplay policy)
  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = isMuted;
      await video.play();
      setIsPlaying(true);
      setRequiresUserGesture(false);
      resetControlsTimeout();
    } catch {
      // Browser blocked unmuted autoplay, prompt user interaction
      setRequiresUserGesture(true);
      setIsPlaying(false);
    }
  }, [isMuted, resetControlsTimeout]);

  // Video setup and listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
      setIsLoading(false);
      attemptPlay();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setRequiresUserGesture(false);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      soundFx.playSuccess();
      onComplete();
    };
    const handleError = (e: Event) => {
      console.error('Intro video error:', e);
      setIsLoading(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Initial attempt if metadata is already loaded
    if (video.readyState >= 1) {
      setDuration(video.duration || 0);
      setIsLoading(false);
      attemptPlay();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [attemptPlay, isMuted, onComplete]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'Escape' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleSkip();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration]);

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
      resetControlsTimeout();
    }
  };

  const toggleMute = () => {
    const next = soundFx.toggleMute();
    setIsMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
    resetControlsTimeout();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = fraction * duration;
    resetControlsTimeout();
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    soundFx.playWhoosh();
    onSkip();
  };

  const handleStartWithAudio = () => {
    soundFx.playClick();
    attemptPlay();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onClick={() => {
        if (requiresUserGesture) {
          handleStartWithAudio();
        } else {
          resetControlsTimeout();
        }
      }}
      className="fixed inset-0 w-screen h-screen bg-black z-50 flex items-center justify-center overflow-hidden select-none cursor-default"
    >
      {/* Full-Screen HTML5 Video */}
      <video
        ref={videoRef}
        src={eventConfig.introVideoUrl}
        poster={eventConfig.introVideoPoster}
        preload="auto"
        playsInline
        className="w-full h-full object-contain bg-black cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (requiresUserGesture) {
            handleStartWithAudio();
          } else {
            togglePlay();
          }
        }}
      />

      {/* Top Header Overlay — Feeds status + SKIP INTRO BUTTON */}
      <div
        className={`absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent transition-opacity duration-300 pointer-events-auto ${
          showControls || !isPlaying || requiresUserGesture ? 'opacity-100' : 'opacity-0 sm:pointer-events-none'
        }`}
      >
        {/* Transmission Status Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#022C22] border border-[#427F40] flex items-center justify-center shadow-[0_0_12px_rgba(66,127,64,0.5)]">
            <Radio className="w-4 h-4 text-[#7D9AA3] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#7D9AA3] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#427F40] animate-ping" />
              <span>DOOMSDAY INTRO // TRANSMISSION</span>
            </div>
            <div className="text-[10px] font-mono text-[#7D9AA3]/70 hidden sm:block">
              LATVERIAN SATELLITE FEED • SEC LEVEL OMEGA
            </div>
          </div>
        </div>

        {/* PROMINENT SKIP BUTTON — Directs to Home Page */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="group inline-flex items-center space-x-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-black/80 hover:bg-[#427F40] text-[#7D9AA3] hover:text-[#022C22] font-mono font-black text-xs sm:text-sm tracking-widest uppercase border border-[#427F40] hover:border-[#7D9AA3] shadow-[0_0_15px_rgba(66,127,64,0.4)] transition-all transform hover:scale-105 active:scale-95"
          title="Skip intro directly to Home Page (Esc)"
        >
          <span>SKIP INTRO</span>
          <SkipForward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Gesture Required Overlay — if browser blocks unmuted autoplay */}
      {requiresUserGesture && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleStartWithAudio();
          }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 text-center animate-fade-in cursor-pointer"
        >
          {/* Emblem */}
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#022C22] border-2 border-[#427F40] p-1 shadow-[0_0_35px_rgba(66,127,64,0.7)] flex items-center justify-center">
              <img
                src="/assets/brand/doom-emblem.webp"
                alt="Doctor Doom Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="absolute -bottom-2 inset-x-0 text-center font-mono text-[10px] text-[#7D9AA3] bg-[#011d16] border border-[#427F40] px-2 py-0.5 rounded-full uppercase">
              FEED READY
            </span>
          </div>

          <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl my-3 flex justify-center px-4">
            <img
              src="/assets/brand/doomsday_protocol_exact.svg"
              alt="Doomsday Protocol"
              className="w-full max-h-48 sm:max-h-60 md:max-h-72 object-contain filter drop-shadow-[0_0_25px_rgba(66,127,64,0.7)]"
            />
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#7D9AA3]/80 max-w-md mb-8">
            Transmission prepared. Click to initiate full-screen cinematic playback with sound.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStartWithAudio();
              }}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#427F40] hover:bg-[#529e4f] text-[#022C22] font-corpta font-black text-sm sm:text-base tracking-widest uppercase shadow-[0_0_25px_rgba(66,127,64,0.7)] border border-[#7D9AA3] transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current text-[#022C22]" />
              <span>PLAY INTRO VIDEO</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              className="inline-flex items-center space-x-2 px-6 py-4 rounded-xl bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white font-corpta text-xs sm:text-sm tracking-wider uppercase border border-[#427F40] transition-colors"
            >
              <span>Skip to Home</span>
              <ArrowRight className="w-4 h-4 text-[#7D9AA3]" />
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && !requiresUserGesture && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-30 pointer-events-none">
          <Loader2 className="w-12 h-12 text-[#427F40] animate-spin mb-3 shadow-toxic-glow" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#7D9AA3]">
            BUFFERING INTRO TRANSMISSION...
          </span>
        </div>
      )}

      {/* Bottom Cinema Control HUD Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent p-4 sm:p-6 z-40 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 sm:pointer-events-none'
        }`}
      >
        {/* Scrubber / Progress Bar */}
        <div
          onClick={handleSeek}
          className="w-full h-2.5 bg-[#022C22] hover:h-3.5 rounded-full cursor-pointer mb-4 relative overflow-hidden transition-all border border-[#427F40]/40 group"
          title="Click to seek"
        >
          <div
            className="h-full bg-gradient-to-r from-[#427F40] to-[#7D9AA3] shadow-[0_0_12px_rgba(66,127,64,0.8)] relative transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons & Timers */}
        <div className="flex items-center justify-between text-xs font-mono text-[#7D9AA3]">
          {/* Left Controls: Play, Replay, Mute, Timestamp */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={togglePlay}
              className="p-2 sm:p-2.5 rounded-lg bg-[#011d16] hover:bg-[#427F40] hover:text-[#022C22] text-[#7D9AA3] border border-[#427F40] transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={handleReplay}
              className="p-2 sm:p-2.5 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white border border-[#427F40]/60 transition-colors"
              title="Restart Intro"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleMute}
              className="p-2 sm:p-2.5 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white border border-[#427F40]/60 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#427F40]" />}
            </button>

            {/* Time Indicator */}
            <span className="font-mono text-xs text-[#7D9AA3] px-2 py-1 rounded bg-[#011d16]/80 border border-[#427F40]/40">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls: Fullscreen toggle & Direct Skip */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={toggleFullscreen}
              className="p-2 sm:p-2.5 rounded-lg bg-[#011d16] hover:bg-[#03241c] text-[#7D9AA3] hover:text-white border border-[#427F40]/60 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            <button
              onClick={handleSkip}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#011d16] hover:bg-[#427F40] text-[#7D9AA3] hover:text-[#022C22] border border-[#427F40] transition-colors"
            >
              <span>Home Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
