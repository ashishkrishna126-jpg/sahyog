export type Language = 'en' | 'hi' | 'ml' | 'ta' | 'kn' | 'te';

export type PodcastCategory = 'medical' | 'personal' | 'news' | 'community';

export interface PodcastEpisode {
  id: string;
  title: string;
  host: string;
  guest: string;
  duration: string;
  date: string;
  description: string;
  category: PodcastCategory;
  audioUrl: string;
  createdAt: Date;
}

export interface Story {
  id: string;
  nickname?: string;
  ageRange?: string;
  country?: string;
  state?: string;
  language: Language;
  storyText: string;
  tags: string[];
  theme: StoryTheme;
  triggerWarning?: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  reactions?: StoryReactions;
}

export type StoryTheme = 
  | 'diagnosis'
  | 'treatment'
  | 'stigma'
  | 'success'
  | 'mentalHealth'
  | 'support';

export interface StoryReactions {
  stayStrong: number;
  weStandWithYou: number;
  youInspireMe: number;
}

export interface GameScore {
  userId: string;
  gameType: string;
  score: number;
  completedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt?: Date;
  type: 'awareness' | 'worldAidsDay' | 'participant' | 'champion';
}

export interface Pledge {
  id: string;
  message: string;
  language: Language;
  createdAt: Date;
}

export interface Resource {
  id: string;
  type: 'helpline' | 'testingCenter' | 'ngo' | 'crisis';
  name: string;
  description: string;
  contact?: string;
  location?: string;
  language: Language;
}

export interface UserPreferences {
  language: Language;
  hasCompletedIntro: boolean;
  badges: Badge[];
  completedGames: string[];
  learningProgress: {
    factsLearned: string[];
    mythsCorrected: string[];
  };
}
