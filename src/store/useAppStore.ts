import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, UserPreferences, Badge } from '../types';

interface AppStore {
  language: Language;
  userPreferences: UserPreferences;
  setLanguage: (language: Language) => void;
  addBadge: (badge: Badge) => void;
  markGameCompleted: (gameId: string) => void;
  addFactLearned: (fact: string) => void;
  addMythCorrected: (myth: string) => void;
  setHasCompletedIntro: (completed: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      language: 'en',
      userPreferences: {
        language: 'en',
        hasCompletedIntro: false,
        badges: [],
        completedGames: [],
        learningProgress: {
          factsLearned: [],
          mythsCorrected: [],
        },
      },
      setLanguage: (_language) => {
        // Force English only
        set((state) => ({
          language: 'en',
          userPreferences: { ...state.userPreferences, language: 'en' },
        }));
      },
      addBadge: (badge) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            badges: [...state.userPreferences.badges, badge],
          },
        })),
      markGameCompleted: (gameId) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            completedGames: [...state.userPreferences.completedGames, gameId],
          },
        })),
      addFactLearned: (fact) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            learningProgress: {
              ...state.userPreferences.learningProgress,
              factsLearned: [
                ...state.userPreferences.learningProgress.factsLearned,
                fact,
              ],
            },
          },
        })),
      addMythCorrected: (myth) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            learningProgress: {
              ...state.userPreferences.learningProgress,
              mythsCorrected: [
                ...state.userPreferences.learningProgress.mythsCorrected,
                myth,
              ],
            },
          },
        })),
      setHasCompletedIntro: (completed) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            hasCompletedIntro: completed,
          },
        })),
    }),
    {
      name: 'hiv-awareness-storage',
    }
  )
);
