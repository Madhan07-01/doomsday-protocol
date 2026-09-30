import { EventConfig } from '../types/story';

export const eventConfig: EventConfig = {
  eventName: "DOOMSDAY PROTOCOL",
  eventEdition: "KRATOS'26",
  tagline: "Operation D-DAY — Earth's Last Line of Defense Runs on Code",
  narrativePremise: 
    "Doctor Doom has conquered Earth, shattered the multiverse, and forged Battleworld. With the Avengers fallen and reality bending under Doom's Beyonder core, humanity's last hope is the Resistance. In three decisive operations, student coders must breach Wanda's Chaos firewalls, sever Doctor Strange's mystical connection, and construct the ultimate algorithm to shatter Doom's throne.",
  
  // Cloudflare R2 Media Configuration
  // Points to Cloudflare R2 custom domain or public endpoint.
  // Can be overridden via VITE_INTRO_VIDEO_URL or VITE_R2_MEDIA_URL.
  r2MediaBaseUrl: import.meta.env.VITE_R2_MEDIA_URL || "https://media.kratos26.net/doomsday-protocol",
  introVideoUrl: import.meta.env.VITE_INTRO_VIDEO_URL || "/assets/videos/intro-video.mp4",
  introVideoPoster: "/assets/images/doom-bg.webp",

  challengeUrls: {
    round1Kahoot: import.meta.env.VITE_ROUND1_KAHOOT_URL || "", // Populated during live event
    round2HackerRank: import.meta.env.VITE_ROUND2_HACKERRANK_URL || "", // Populated during live event
    round3Submission: import.meta.env.VITE_ROUND3_SUBMISSION_URL || "", // Populated during live event
  },

  organizerInfo: {
    name: "KRATOS'26 Technical Committee",
    edition: "Annual National Level Technical Symposium",
    college: "Department of Computer Science & Engineering",
    department: "Event Wing & Hackathon Arena",
    contactNote: "For official team pairings, room allotments, or platform credentials, report to the Control Deck.",
  },
};
