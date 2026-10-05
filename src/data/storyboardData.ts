export interface ComicScene {
  id: string;
  sceneNumber: number;
  refNumber: number;
  imagePath: string;
  chapter: 'intro' | 'wanda-arc' | 'strange-arc' | 'doom-sequel';
  chapterTitle: string;
  isEmptyPlaceholder?: boolean;
}

export const storyboardScenes: ComicScene[] = [
  // Block 1: Intro / Prologue (upto ref 11)
  { id: 'ref-01', sceneNumber: 1, refNumber: 1, imagePath: '/storyboard/01_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-02', sceneNumber: 2, refNumber: 2, imagePath: '/storyboard/02_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-03', sceneNumber: 3, refNumber: 3, imagePath: '/storyboard/03_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-04', sceneNumber: 4, refNumber: 4, imagePath: '/storyboard/04_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-05', sceneNumber: 5, refNumber: 5, imagePath: '/storyboard/05_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-06', sceneNumber: 6, refNumber: 6, imagePath: '/storyboard/06_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-07', sceneNumber: 7, refNumber: 7, imagePath: '/storyboard/07_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-08', sceneNumber: 8, refNumber: 8, imagePath: '/storyboard/08_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-09', sceneNumber: 9, refNumber: 9, imagePath: '/storyboard/09_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-10', sceneNumber: 10, refNumber: 10, imagePath: '/storyboard/10_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },
  { id: 'ref-11', sceneNumber: 11, refNumber: 11, imagePath: '/storyboard/11_ref.png', chapter: 'intro', chapterTitle: 'PROLOGUE' },

  // Block 2: Wanda Protocol Storyboard (ref 14 to ref 18)
  { id: 'ref-14', sceneNumber: 12, refNumber: 14, imagePath: '/storyboard/14_ref.png', chapter: 'wanda-arc', chapterTitle: 'WANDA PROTOCOL' },
  { id: 'ref-15', sceneNumber: 13, refNumber: 15, imagePath: '/storyboard/15_ref.png', chapter: 'wanda-arc', chapterTitle: 'WANDA PROTOCOL' },
  { id: 'ref-16', sceneNumber: 14, refNumber: 16, imagePath: '/storyboard/16_ref.png', chapter: 'wanda-arc', chapterTitle: 'WANDA PROTOCOL' },
  { id: 'ref-17', sceneNumber: 15, refNumber: 17, imagePath: '/storyboard/17_ref.png', chapter: 'wanda-arc', chapterTitle: 'WANDA PROTOCOL' },
  { id: 'ref-18', sceneNumber: 16, refNumber: 18, imagePath: '/storyboard/18_ref.png', chapter: 'wanda-arc', chapterTitle: 'WANDA PROTOCOL' },

  // Block 3: Strange Protocol Storyboard (ref 20)
  { id: 'ref-20', sceneNumber: 17, refNumber: 20, imagePath: '/storyboard/20_ref.png', chapter: 'strange-arc', chapterTitle: 'STRANGE PROTOCOL' },

  // Block 4: Doom Sequel empty placeholder pages (3 pages)
  { id: 'doom-seq-1', sceneNumber: 18, refNumber: 21, imagePath: '', chapter: 'doom-sequel', chapterTitle: 'DOOM SEQUEL', isEmptyPlaceholder: true },
  { id: 'doom-seq-2', sceneNumber: 19, refNumber: 22, imagePath: '', chapter: 'doom-sequel', chapterTitle: 'DOOM SEQUEL', isEmptyPlaceholder: true },
  { id: 'doom-seq-3', sceneNumber: 20, refNumber: 23, imagePath: '', chapter: 'doom-sequel', chapterTitle: 'DOOM SEQUEL', isEmptyPlaceholder: true },
];
