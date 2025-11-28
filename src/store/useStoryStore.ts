import { create } from 'zustand';
import { Story, StoryReactions } from '../types';

interface StoryStore {
  stories: Story[];
  loading: boolean;
  error: string | null;
  setStories: (stories: Story[]) => void;
  addStory: (story: Story) => void;
  addReaction: (storyId: string, reactionType: keyof StoryReactions) => void;
  updateStoryStatus: (storyId: string, status: Story['status']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStoryStore = create<StoryStore>((set) => ({
  stories: [],
  loading: false,
  error: null,
  setStories: (stories) => set({ stories }),
  addStory: (story) => set((state) => ({ stories: [story, ...state.stories] })),
  addReaction: (storyId, reactionType) =>
    set((state) => ({
      stories: state.stories.map((story) =>
        story.id === storyId
          ? {
              ...story,
              reactions: {
                stayStrong: story.reactions?.stayStrong || 0,
                weStandWithYou: story.reactions?.weStandWithYou || 0,
                youInspireMe: story.reactions?.youInspireMe || 0,
                ...story.reactions,
                [reactionType]: ((story.reactions as any)?.[reactionType] || 0) + 1,
              } as any,
            }
          : story
      ),
    })),
  updateStoryStatus: (storyId, status) =>
    set((state) => ({
      stories: state.stories.map((story) =>
        story.id === storyId ? { ...story, status } : story
      ),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
