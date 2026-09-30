export type RoundId = 'prologue' | 'round-1' | 'round-2' | 'round-3' | 'epilogue';

export interface DialogueLine {
  speaker?: string;
  text: string;
  type?: 'speech' | 'whisper' | 'shout' | 'caption' | 'terminal';
}

export interface Scene {
  id: string;
  sceneNumber: number;
  title: string;
  roundId: RoundId;
  chapterLabel: string;
  narrativeText: string;
  dialogue: DialogueLine[];
  imagePath: string;
  imageAlt: string;
  soundEffectText?: string;
  characterBadge?: string;
  atmosphericTone: 'peaceful' | 'threat' | 'battle' | 'fall' | 'cosmic' | 'chaos' | 'resistance' | 'glitch' | 'forge' | 'victory' | 'triumph' | 'astral-glitch';
  techHint?: string;
}

export interface RoundInfo {
  id: 'round-1' | 'round-2' | 'round-3';
  roundNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  narrativeObjective: string;
  description: string;
  sceneRange: { start: number; end: number };
  challengeName: string;
  platform: string;
  accentColor: string;
  secondaryColor: string;
  iconName: string;
  rules: string[];
  composition: string[];
  externalUrl?: string;
}

export interface EventConfig {
  eventName: string;
  eventEdition: string;
  tagline: string;
  narrativePremise: string;
  introVideoUrl: string;
  introVideoPoster: string;
  r2MediaBaseUrl: string;
  challengeUrls: {
    round1Kahoot?: string;
    round2HackerRank?: string;
    round3Submission?: string;
  };
  organizerInfo: {
    name: string;
    edition: string;
    college: string;
    department: string;
    contactNote: string;
  };
}

export interface QuizQuestion {
  id: number;
  category: 'code-output' | 'cs-mcq' | 'pattern' | 'logic';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface DebugProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  buggySnippet: string;
  fixedSnippet: string;
  explanation: string;
  testCase: string;
}
