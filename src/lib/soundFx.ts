// Cinematic Audio Synthesizer utilizing Web Audio API
// Guarantees zero 404s, instant response, and clean volume/mute controls

let audioCtx: AudioContext | null = null;
let ambientOscillator: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let isMutedState = false;

// Check localStorage for audio preference
if (typeof window !== 'undefined') {
  isMutedState = localStorage.getItem('doomsday_audio_muted') === 'true';
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Paper turning audio element pool for rapid, zero-latency playback using paper turning.mp3
const paperAudioPool: HTMLAudioElement[] = [];
const POOL_SIZE = 3;
let currentAudioIdx = 0;

function getPaperTurnAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (paperAudioPool.length === 0) {
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio('/assets/audio/paper-turning.mp3');
      audio.preload = 'auto';
      paperAudioPool.push(audio);
    }
  }
  const audio = paperAudioPool[currentAudioIdx];
  currentAudioIdx = (currentAudioIdx + 1) % POOL_SIZE;
  return audio;
}

export const soundFx = {
  isMuted(): boolean {
    return isMutedState;
  },

  setMuted(muted: boolean) {
    isMutedState = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('doomsday_audio_muted', String(muted));
    }
    if (ambientGain) {
      ambientGain.gain.setValueAtTime(muted ? 0 : 0.04, audioCtx?.currentTime || 0);
    }
  },

  toggleMute(): boolean {
    this.setMuted(!isMutedState);
    return isMutedState;
  },

  playClick() {
    if (isMutedState) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  },

  playWhoosh() {
    if (isMutedState) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  },

  // Paper page flip using user's paper turning.mp3
  playPageTurn() {
    if (isMutedState) return;

    if (typeof window !== 'undefined') {
      try {
        const audio = getPaperTurnAudio();
        if (audio) {
          audio.currentTime = 0;
          audio.volume = 0.85;
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Fallback to procedural synth if browser autoplay blocks or file error
              this.playPageTurnSynthesized();
            });
          }
          return;
        }
      } catch {
        // Fallback
      }
    }

    this.playPageTurnSynthesized();
  },

  // Procedural synthesizer fallback for paper flip
  playPageTurnSynthesized() {
    if (isMutedState) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.28; // 280ms duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate textured paper friction noise
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = data[i];
      data[i] *= 2.8;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to paper rustle frequency
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.frequency.exponentialRampToValueAtTime(650, now + 0.25);
    filter.Q.setValueAtTime(1.8, now);

    // Paper rustle gain envelope
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.35, now + 0.06);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Low-end paper flutter/air swoosh
    const swoosh = ctx.createOscillator();
    const swooshGain = ctx.createGain();

    swoosh.type = 'sine';
    swoosh.frequency.setValueAtTime(180, now);
    swoosh.frequency.exponentialRampToValueAtTime(70, now + 0.22);

    swooshGain.gain.setValueAtTime(0.001, now);
    swooshGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    swooshGain.gain.linearRampToValueAtTime(0.001, now + 0.24);

    swoosh.connect(swooshGain);
    swooshGain.connect(ctx.destination);

    noise.start(now);
    swoosh.start(now);
    noise.stop(now + 0.28);
    swoosh.stop(now + 0.28);
  },

  playGlitch() {
    if (isMutedState) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.03);
    osc.frequency.setValueAtTime(160, ctx.currentTime + 0.07);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  },

  playSuccess() {
    if (isMutedState) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A major chord
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  },

  // Background audio disabled as requested (user will provide new audio in the future)
  startAmbientDrone() {
    // Disabled
  },

  stopAmbientDrone() {
    if (ambientOscillator) {
      try {
        ambientOscillator.stop();
        ambientOscillator.disconnect();
      } catch {
        // cleanup
      }
      ambientOscillator = null;
      ambientGain = null;
    }
  },
};
