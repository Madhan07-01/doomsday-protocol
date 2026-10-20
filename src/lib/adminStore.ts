/**
 * adminStore — lightweight localStorage-backed store for admin controls.
 * All pages read from this to react to admin changes in real-time.
 */

export interface AdminState {
  /** Round access toggles */
  round1Enabled: boolean;
  round2Enabled: boolean;
  round3Enabled: boolean;

  /** External links posted by admin */
  round1QuizLink: string;
  round1RoomCode: string;
  round2HackerRankLink: string;
  round3Link: string;

  /** Round 3 Problem Statement (revealed by admin on event day) */
  round3ProblemStatement: string;

  /** Timer started by admin (participants see countdown, no start button) */
  timerStarted: boolean;
  timerStartedAt: number | null; // epoch ms
  timerDurationMinutes: number;
}

const STORAGE_KEY = 'dp_admin_state';

const DEFAULT_STATE: AdminState = {
  round1Enabled: true,
  round2Enabled: false,
  round3Enabled: false,
  round1QuizLink: '',
  round1RoomCode: '',
  round2HackerRankLink: '',
  round3Link: '',
  round3ProblemStatement: '',
  timerStarted: false,
  timerStartedAt: null,
  timerDurationMinutes: 60,
};

function load(): AdminState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function save(state: AdminState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch event so other tabs/components can react
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch {
    // ignore
  }
}

export const adminStore = {
  get(): AdminState {
    return load();
  },

  set(partial: Partial<AdminState>): void {
    const current = load();
    save({ ...current, ...partial });
  },

  reset(): void {
    save({ ...DEFAULT_STATE });
  },

  /** Subscribe to changes. Returns unsubscribe fn. */
  subscribe(cb: (state: AdminState) => void): () => void {
    const handler = () => cb(load());
    window.addEventListener('storage', handler);
    // Also listen for same-tab updates via a custom event
    window.addEventListener('dp_admin_update', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('dp_admin_update', handler);
    };
  },
};

/** Override save to also fire custom same-tab event */
const _originalSave = save;
// Patch: dispatch custom event on same tab too
Object.defineProperty(adminStore, 'set', {
  value: (partial: Partial<AdminState>) => {
    const current = load();
    const next = { ...current, ...partial };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent('dp_admin_update'));
  },
  writable: true,
});
void _originalSave; // suppress unused warning
