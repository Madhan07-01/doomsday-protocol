import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { IntroScreen } from './components/intro/IntroScreen';
import { StoryHub } from './components/story/StoryHub';
import { ComicReader } from './components/story/ComicReader';
import { RoundSetup } from './components/story/RoundSetup';
import { Round3Arena } from './components/story/Round3Arena';
import { StoryEndCard } from './components/story/StoryEndCard';
import { GreenSmoke } from './components/effects/GreenSmoke';
import { DoomTransition } from './components/effects/DoomTransition';
import { useStoryProgress } from './hooks/useStoryProgress';
import { roundsData } from './data/rounds';
import { storyboardScenes } from './data/storyboardData';

// Linear flow definition:
// 1. Intro: refs 01 to 11
// 2. Round 1: Wanda Protocol setup (Wayground Quiz)
// 3. Wanda Story: refs 14 to 18
// 4. Round 2: Strange Protocol setup (HackerRank Debugging)
// 5. Strange Story (ref 20) + 3 Doom Sequel placeholders (scenes 18-20)
// 6. Round 3 Arena: Problem Statement Reveal & Timer (Final Page)
type FlowStep =
  | { type: 'scenes'; from: number; to: number }
  | { type: 'round-setup'; roundIndex: number }
  | { type: 'round3-arena' }
  | { type: 'end-card' };

const FLOW: FlowStep[] = [
  { type: 'scenes', from: 1, to: 11 },       // Intro: refs 01-11
  { type: 'round-setup', roundIndex: 0 },     // Round 1: Wanda Protocol (Wayground)
  { type: 'scenes', from: 12, to: 16 },      // Wanda Story: refs 14-18
  { type: 'round-setup', roundIndex: 1 },     // Round 2: Strange Protocol (HackerRank)
  { type: 'scenes', from: 17, to: 20 },      // Strange Climax (ref 20) + 3 Doom Sequel Placeholders
  { type: 'round3-arena' },                  // Round 3: Problem Statement Reveal & Timer (Final Page)
];

export function App() {
  const [currentView, setCurrentView] = useState<string>('intro');
  const [flowStepIndex, setFlowStepIndex] = useState<number>(0);

  const {
    currentSceneNumber,
    currentScene,
    canGoPrev,
    canGoNext,
    goToNextScene,
    goToPrevScene,
    jumpToScene,
    visitedScenes,
  } = useStoryProgress();

  // Tactical HUD scanline transition activates only on view changes (e.g. entering rounds / hub)
  // Inside the ComicReader, 3D framer-motion page flips handle scene-to-scene page turns
  const transitionKey = currentView;

  // Return to Story Hub (Home)
  const goToHub = () => {
    setCurrentView('hub');
  };

  // Start the full story from scene 1
  const handleStartStory = () => {
    setFlowStepIndex(0);
    jumpToScene(1);
    setCurrentView('reader');
  };

  // Enter a round directly from hub
  const handleEnterRound = (roundId: string) => {
    switch (roundId) {
      case 'round-1': {
        const idx = FLOW.findIndex((s) => s.type === 'round-setup' && (s as { type: 'round-setup'; roundIndex: number }).roundIndex === 0);
        setFlowStepIndex(idx >= 0 ? idx : 1);
        setCurrentView('round-setup');
        break;
      }
      case 'round-2': {
        const idx = FLOW.findIndex((s) => s.type === 'round-setup' && (s as { type: 'round-setup'; roundIndex: number }).roundIndex === 1);
        setFlowStepIndex(idx >= 0 ? idx : 3);
        setCurrentView('round-setup');
        break;
      }
      case 'round-3': {
        const idx = FLOW.findIndex((s) => s.type === 'round3-arena');
        setFlowStepIndex(idx >= 0 ? idx : 5);
        setCurrentView('round3-arena');
        break;
      }
    }
  };

  // Advance to next step in the flow
  const advanceFlow = () => {
    const nextIdx = flowStepIndex + 1;
    if (nextIdx >= FLOW.length) {
      setCurrentView('round3-arena');
      return;
    }
    applyFlowStep(nextIdx, false);
  };

  // Retreat to previous step in the flow
  const retreatFlow = () => {
    const prevIdx = flowStepIndex - 1;
    if (prevIdx < 0) {
      goToHub();
      return;
    }
    applyFlowStep(prevIdx, true);
  };

  // Switch to a flow step
  const applyFlowStep = (idx: number, goToEnd = false) => {
    setFlowStepIndex(idx);
    const step = FLOW[idx];
    if (step.type === 'scenes') {
      const sceneNum = goToEnd ? step.to : step.from;
      jumpToScene(sceneNum);
      setCurrentView('reader');
    } else if (step.type === 'round-setup') {
      setCurrentView('round-setup');
    } else if (step.type === 'round3-arena') {
      setCurrentView('round3-arena');
    } else if (step.type === 'end-card') {
      setCurrentView('end-card');
    }
  };

  // Reader Next: advance within block or advance to next flow step
  const handleReaderNext = () => {
    const step = FLOW[flowStepIndex];
    if (step && step.type === 'scenes') {
      if (currentSceneNumber < step.to && canGoNext) {
        goToNextScene();
      } else {
        advanceFlow();
      }
    } else {
      advanceFlow();
    }
  };

  // Reader Prev: retreat within block or retreat to previous flow step
  const handleReaderPrev = () => {
    const step = FLOW[flowStepIndex];
    if (step && step.type === 'scenes') {
      if (currentSceneNumber > step.from && canGoPrev) {
        goToPrevScene();
      } else if (flowStepIndex > 0) {
        retreatFlow();
      } else {
        goToHub();
      }
    } else if (flowStepIndex > 0) {
      retreatFlow();
    } else {
      goToHub();
    }
  };

  // Which round setup to render
  const currentFlowStep = FLOW[flowStepIndex];
  const currentRoundSetupStep = currentFlowStep?.type === 'round-setup'
    ? (currentFlowStep as { type: 'round-setup'; roundIndex: number })
    : null;

  return (
    <div className="fixed inset-0 flex flex-col bg-[#06120e] text-[#7D9AA3] overflow-hidden select-none">

      {/* Ambient Doctor Doom Backdrop - High-Visibility Artwork */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center opacity-80 filter contrast-110 brightness-95"
        style={{ backgroundImage: "url('/assets/images/doom-bg.webp')" }}
      >
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Cinematic Smoke Video Effect blended as SCREEN */}
      <GreenSmoke className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" opacity={0.65} />

      {/* Cinematic Doom Green Transition Wipe between view changes */}
      <DoomTransition transitionKey={transitionKey} />

      {/* Navbar — only shown on Hub, End Card, and Intro */}
      {(currentView === 'hub' || currentView === 'end-card') && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'hub') goToHub();
          }}
          onReplayIntro={() => setCurrentView('intro')}
        />
      )}

      {/* Main Content Area - All views are fixed and non-scrollable */}
      <main className="relative z-10 flex-grow h-full overflow-hidden">

        {/* 1. Intro Screen */}
        {currentView === 'intro' && (
          <IntroScreen onEnterStoryHub={goToHub} />
        )}

        {/* 2. Story Hub (Home) */}
        {currentView === 'hub' && (
          <StoryHub
            onEnterRound={handleEnterRound}
            onReadScene={(sceneNum) => {
              jumpToScene(sceneNum);
              const idx = FLOW.findIndex(
                (s) => s.type === 'scenes' && sceneNum >= (s as { type: 'scenes'; from: number; to: number }).from && sceneNum <= (s as { type: 'scenes'; from: number; to: number }).to
              );
              setFlowStepIndex(idx >= 0 ? idx : 0);
              setCurrentView('reader');
            }}
            onReplayIntro={() => setCurrentView('intro')}
            visitedScenes={visitedScenes}
          />
        )}

        {/* 3. Comic Storyboard Reader — Full Viewport, Image Only, 3D Flip & Page Turn Audio, Dots Only */}
        {currentView === 'reader' && (
          <ComicReader
            currentScene={currentScene}
            allScenes={storyboardScenes}
            canGoPrev={flowStepIndex > 0 || currentSceneNumber > 1}
            canGoNext={flowStepIndex < FLOW.length - 1 || currentSceneNumber < storyboardScenes.length}
            onNext={handleReaderNext}
            onPrev={handleReaderPrev}
            onJumpToScene={(num) => {
              jumpToScene(num);
              const idx = FLOW.findIndex(
                (s) => s.type === 'scenes' && num >= (s as { type: 'scenes'; from: number; to: number }).from && num <= (s as { type: 'scenes'; from: number; to: number }).to
              );
              if (idx >= 0) setFlowStepIndex(idx);
            }}
            onReturnToHub={goToHub}
          />
        )}

        {/* 4. Round 1 & Round 2 Setup pages (Wanda & Strange Protocols) */}
        {currentView === 'round-setup' && currentRoundSetupStep !== null && (
          <RoundSetup
            round={roundsData[currentRoundSetupStep.roundIndex]}
            onContinueStory={advanceFlow}
            onReturnToHub={goToHub}
            onPrev={retreatFlow}
          />
        )}

        {/* 5. Round 3 Arena — Problem Statement Reveal & Doomsday Timer (Final Page) */}
        {currentView === 'round3-arena' && (
          <Round3Arena
            onContinueStory={advanceFlow}
            onReturnToHub={goToHub}
            onPrev={retreatFlow}
          />
        )}

        {/* 6. Story End Card */}
        {currentView === 'end-card' && (
          <StoryEndCard
            onReplayStory={handleStartStory}
            onReturnToHub={goToHub}
            onSelectRound={handleEnterRound}
            onPrev={retreatFlow}
          />
        )}
      </main>
    </div>
  );
}

export default App;

