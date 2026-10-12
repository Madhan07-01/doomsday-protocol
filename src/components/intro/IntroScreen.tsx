import React from 'react';
import { IntroVideoPlayer } from './IntroVideoPlayer';

interface IntroScreenProps {
  onEnterStoryHub: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnterStoryHub }) => {
  return (
    <IntroVideoPlayer
      onComplete={onEnterStoryHub}
      onSkip={onEnterStoryHub}
    />
  );
};
