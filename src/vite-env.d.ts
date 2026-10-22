/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_R2_MEDIA_URL?: string;
  readonly VITE_INTRO_VIDEO_URL?: string;
  readonly VITE_USE_R2_MEDIA?: string;
  readonly VITE_ROUND1_KAHOOT_URL?: string;
  readonly VITE_ROUND2_HACKERRANK_URL?: string;
  readonly VITE_ROUND3_SUBMISSION_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
