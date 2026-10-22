# DOOMSDAY PROTOCOL — KRATOS '26
> **"Operation D-DAY — Earth's Last Line of Defense Runs on Code"**

A cinematic, comic-book storytelling web application and 3-round technical hackathon platform built for **KRATOS '26** (Department of Artificial Intelligence & Data Science).

[![Built with React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.3-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 1. Narrative Premise & Lore

Doctor Doom has conquered Earth, shattered the multiverse, and forged **Battleworld** from its fragments. Earth's mightiest heroes have fallen. Doctor Strange is bound into an astral conduit channeling cosmic energy directly to Doom's throne, while Wanda Maximoff weaves reality-warping Chaos Magic around humanity's champions.

Participants take on the role of the **Resistance**: student hackers, engineers, and coders who must breach Wanda's Chaos Hex, sever Strange's mystical connection, and vibe-code the final digital weapon to dismantle Doom's citadel in the central arena.

---

## 2. Event Structure & Competition Rounds

The competition is organized across three progressive rounds interwoven with canonical comic cutscenes:

| Round | Protocol Title | Narrative Objective | Platform & Format | Canonical Scenes |
|---|---|---|---|---|
| **Round 1** | **The Wanda Protocol** | Recruit. Think. Outsmart. | **Wayground / Quiz Arena** (Timed technical quiz, room codes broadcast live) | Scenes 01–11 → Round 1 Setup |
| **Round 2** | **The Strange Protocol** | Debug. Disrupt. Break the connection. | **HackerRank Conduit** (Corrupted code debugging & logic repair) | Scenes 12–16 → Round 2 Setup |
| **Round 3** | **The Doom Protocol** | Build. Innovate. End the apocalypse. | **Live AI Vibe-Coding Arena** (On-spot problem statement reveal & synchronized 2-hour countdown) | Scenes 17–20 → Final Level Arena |

---

## 3. Key Platform Features

### 📖 20-Scene Cinematic 3D Comic Reader
- **Photorealistic Storyboard**: 20 canonical storyline artwork scenes depicting the fall of Earth, the Resistance uprising, and the siege on Doom's fortress.
- **3D Page Turning**: Physics-based page flip transitions powered by Framer Motion with directional perspective.
- **Procedural Sound FX**: Realistic paper-turning audio and synthesized ambient drones via the HTML5/Web Audio API.
- **Clean Navigation HUD**: Non-scrollable bottom pagination dots and keyboard shortcuts (`Left`/`Right` arrow keys, `Space`, `Escape`).

### 🎬 Fullscreen Cinema Intro Video Player
- Seamless video streaming with atmospheric sound design.
- **Browser Autoplay Guard**: Gracefully detects browser unmuted autoplay restrictions and prompts the user with an interactive activation overlay.
- Complete cinema HUD: scrub controls, timestamp display, replay, and skip-to-home.

### 🛡️ Stealth Organizer Admin Console (`/admin`)
A hidden operations command center accessed via URL (`/admin`) protected by security authentication:
- **Round Access Toggles**: Lock or unlock Round 1, Round 2, and Round 3 independently with immediate live UI synchronization.
- **Dynamic Platform Links**: Paste live Wayground quiz links, HackerRank conduit URLs, and Round 1 room codes on event day.
- **Problem Statement On-Spot Reveal**: Input and broadcast the Round 3 challenge problem statement in real-time.
- **Master Countdown Timer**: Start, pause, or reset the global synchronized timer for participants with emergency visual alarms when time runs low.

### 🎨 Custom Cyberpunk Visual Identity & Typography
- **Curated Color Palette**: Doctor Doom cinematic palette featuring Deep Emerald/Slate (`#7D9AA3`), Toxic Forest Green (`#427F40`), Citadel Chamber (`#022C22`), and Obsidian Base (`#06120e`).
- **Corpta Display Typography**: High-tech futuristic display font integrated across titles, badges, and interface controls.
- **Atmospheric Green Smoke**: Procedural multi-layer smoke drift particles rendered on canvas and blended as screen layers.

---

## 4. Technology Stack & Architecture

```
doomsday-protocol/
├── public/
│   ├── assets/
│   │   ├── brand/                     # Emblems, SVG icons, and logos
│   │   ├── audio/                     # Sound FX assets
│   │   └── videos/                    # Cinematic video streams (Git LFS)
│   ├── fonts/                         # Corpta OpenType font assets
│   ├── storyboard/                    # 20 canonical comic storyboard scenes
│   └── _redirects                     # SPA client-side routing rewrites
├── src/
│   ├── components/
│   │   ├── admin/                     # AdminPage control room
│   │   ├── effects/                   # GreenSmoke & DoomTransition shaders
│   │   ├── intro/                     # IntroScreen & IntroVideoPlayer
│   │   ├── layout/                    # Navbar with sound FX toggles
│   │   └── story/                     # StoryHub, ComicReader, RoundSetup, Round3Arena, StoryEndCard
│   ├── data/
│   │   ├── eventConfig.ts             # College & symposium metadata
│   │   ├── rounds.ts                  # Round metadata & initial placeholders
│   │   └── storyboardData.ts          # 20-scene narrative dataset
│   ├── lib/
│   │   ├── adminStore.ts              # Live synced event state store
│   │   └── soundFx.ts                 # Web Audio synthesizer
│   ├── styles/
│   │   └── globals.css                # Comic strokes, @font-face, glow filters
│   ├── App.tsx                        # Main state & view coordinator
│   └── main.tsx                       # Entry point & URL routing (/admin vs /)
├── tailwind.config.js                 # Custom Doom theme tokens & animations
└── vite.config.ts                     # Optimized Vite build configuration
```

---

## 5. Local Setup & Quickstart

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** with **Git LFS** (`git lfs install`)

### 1. Clone the Repository
```bash
git clone https://github.com/Madhan07-01/doomsday-protocol.git
cd doomsday-protocol
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 6. Organizer Credentials & Access

- **Admin URL**: Navigate directly to `/admin` in the browser address bar.
- **Default Passcode**: `iloveyou3000`
- The admin button is deliberately hidden from participant navigation bars to prevent unauthorized access.

---

## 7. Event & Symposium Credits

- **Event**: KRATOS '26 — National Level Technical Symposium
- **Organizers**: Department of Artificial Intelligence & Data Science
- **Platform Architecture**: Doomsday Protocol Core Engineering Team

---

*“When the heroes fall, the coders rise.”*
