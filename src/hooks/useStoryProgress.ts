import { useState, useEffect, useCallback } from 'react';
import { storyboardScenes, ComicScene } from '../data/storyboardData';

export type StoryMode = 'full' | 'round';

const STORAGE_KEY = 'doomsday_visited_scenes';
const LAST_SCENE_KEY = 'doomsday_last_scene';

export function useStoryProgress() {
  const [currentSceneNumber, setCurrentSceneNumber] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    const saved = localStorage.getItem(LAST_SCENE_KEY);
    const parsed = saved ? parseInt(saved, 10) : 1;
    return parsed >= 1 && parsed <= storyboardScenes.length ? parsed : 1;
  });

  const [mode, setMode] = useState<StoryMode>('full');

  const [visitedScenes, setVisitedScenes] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [1];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [1];
      return Array.isArray(parsed) ? parsed : [1];
    } catch {
      return [1];
    }
  });

  // Keep track of visited scenes
  useEffect(() => {
    setVisitedScenes((prev) => {
      if (!prev.includes(currentSceneNumber)) {
        const next = [...prev, currentSceneNumber].sort((a, b) => a - b);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }
      return prev;
    });
    localStorage.setItem(LAST_SCENE_KEY, String(currentSceneNumber));
  }, [currentSceneNumber]);

  // Determine current active scene object
  const currentScene: ComicScene =
    storyboardScenes.find((s) => s.sceneNumber === currentSceneNumber) || storyboardScenes[0];

  const currentDisplayIndex = storyboardScenes.findIndex((s) => s.sceneNumber === currentSceneNumber);

  const canGoPrev = currentDisplayIndex > 0;
  const canGoNext = currentDisplayIndex < storyboardScenes.length - 1;

  const goToNextScene = useCallback(() => {
    setCurrentSceneNumber((prev) => Math.min(prev + 1, storyboardScenes.length));
  }, []);

  const goToPrevScene = useCallback(() => {
    setCurrentSceneNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const jumpToScene = useCallback((sceneNum: number) => {
    if (sceneNum >= 1 && sceneNum <= storyboardScenes.length) {
      setCurrentSceneNumber(sceneNum);
    }
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_SCENE_KEY);
    setVisitedScenes([1]);
    setCurrentSceneNumber(1);
    setMode('full');
  }, []);

  return {
    currentSceneNumber,
    currentScene,
    mode,
    setMode,
    allScenes: storyboardScenes,
    totalCanonicalScenes: storyboardScenes.length,
    visitedScenes,
    canGoPrev,
    canGoNext,
    goToNextScene,
    goToPrevScene,
    jumpToScene,
    resetProgress,
  };
}

