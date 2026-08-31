export type Language = 'fa' | 'en';

export interface SalonChapter {
  id: string;
  number: string;
  numberFa: string;
  title: {
    fa: string;
    en: string;
  };
  subtitle: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  startProgress: number;
  endProgress: number;
  coordinates: {
    fa: string;
    en: string;
  };
  highlights: {
    fa: string[];
    en: string[];
  };
}

export interface SalonService {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  category: 'color' | 'cut' | 'ritual' | 'spa';
  duration: {
    fa: string;
    en: string;
  };
  price: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  highlight?: {
    fa: string;
    en: string;
  };
}

export interface SalonArtisan {
  name: {
    fa: string;
    en: string;
  };
  role: {
    fa: string;
    en: string;
  };
  bio: {
    fa: string;
    en: string;
  };
  specialty: {
    fa: string;
    en: string;
  };
  experience: {
    fa: string;
    en: string;
  };
  avatarText: string;
}

export interface VideoScrubberConfig {
  videoSrcDesktop?: string;
  videoSrcMobile?: string;
  videoSrc?: string;
  heroHeightVh: number;
  lerpFactor: number;
  minSeekDeltaSeconds: number;
  objectPosition: string;
}
