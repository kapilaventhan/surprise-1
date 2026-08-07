export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  iconName?: string;
  tag?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category?: string;
}

export interface ReasonCard {f
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LoveQuote {
  id: string;
  quote: string;
  author: string;
}

export interface StorybookPage {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  date?: string;
}

export interface TreasureItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  secretNote?: string;
}

export interface VideoConfig {
  enabled: boolean;
  source: string;
  title: string;
  thumbnail?: string;
}

export interface MusicConfig {
  enabled: boolean;
  file: string;
  volume?: number;
}

export interface BirthdayConfig {
  herName: string;
  yourName: string;
  tagline: string;
  targetDate: string; // ISO string or format e.g. "2026-08-08T00:00:00"
  password?: string;
  passwordHint?: string;
  letterText: string;
  endingText: string[];
  musicUrl?: string;
  videoUrl?: string;
  birthdayVideo?: VideoConfig;
  birthdayMusic?: MusicConfig;
  memories: MemoryItem[];
  galleryPhotos: GalleryPhoto[];
  reasons: ReasonCard[];
  hundredReasons?: string[];
  storybookPages?: StorybookPage[];
  treasureItems?: TreasureItem[];
  hiddenHeartsNotes?: string[];
  loveQuotes: LoveQuote[];
  floatingNotes: string[];
}
