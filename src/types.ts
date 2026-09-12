export interface TimelineStop {
  id: number;
  time: string;
  title: string;
  role: string;
  character: string;
  avatar: string;
  speech: string;
  artifact: string;
  badgeColor: string;
  bubbleBorder: string;
  locationDetails: string;
  image: string;
  locationName?: string;
}

export interface Prize {
  rank: string;
  title: string;
  cash: string;
  tagline: string;
  medal: string;
  isElevated?: boolean;
  color: string;
  border: string;
  glow: string;
  trophyDesc: string;
  perks: string[];
}

export interface RegistrationData {
  teamName: string;
  leaderName: string;
  email: string;
  teamSize: number;
  track: string;
  experienceLevel: string;
  dietaryPreference: string;
}

export type HackathonTrack = 
  | 'Oceanic AI & Marine Vision'
  | 'Decentralized Kelp & Web3'
  | 'Sandy’s Bio-Dome Rocketry'
  | 'Hydrodynamic DevTools';
