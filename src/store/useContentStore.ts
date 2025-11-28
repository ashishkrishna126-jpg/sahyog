import { create } from 'zustand';
import { PodcastEpisode } from '../types';

const initialPodcasts: PodcastEpisode[] = [
  {
    id: '1',
    title: 'Living Positively: A Journey of Hope',
    host: 'Dr. Sarah',
    guest: 'Rahul K.',
    duration: '45:20',
    date: 'Nov 24, 2025',
    description: 'Rahul shares his inspiring journey living with HIV for a decade—overcoming stigma and finding community.',
    category: 'personal',
    language: 'en',
    audioUrl: 'https://sa-hyog-media/podcasts/living-positively.mp3',
    createdAt: new Date('2025-11-24'),
  },
  {
    id: '2',
    title: 'U=U: Undetectable equals Untransmittable',
    host: 'Dr. Sarah',
    guest: 'Dr. Anjali M.',
    duration: '32:15',
    date: 'Nov 20, 2025',
    description: 'Dr. Anjali explains the science behind U=U and how it reshapes relationships and disclosure.',
    category: 'medical',
    language: 'en',
    audioUrl: 'https://sa-hyog-media/podcasts/uu.mp3',
    createdAt: new Date('2025-11-20'),
  },
  {
    id: '3',
    title: 'Breaking the Silence in Rural India',
    host: 'Dr. Sarah',
    guest: 'Community Workers Panel',
    duration: '55:00',
    date: 'Nov 15, 2025',
    description: 'A roundtable with grassroots workers about spreading HIV awareness across rural Kerala and beyond.',
    category: 'news',
    language: 'en',
    audioUrl: 'https://sa-hyog-media/podcasts/rural-silence.mp3',
    createdAt: new Date('2025-11-15'),
  },
];

interface ContentStore {
  podcasts: PodcastEpisode[];
  addPodcast: (episode: PodcastEpisode) => void;
  setPodcasts: (episodes: PodcastEpisode[]) => void;
}

export const useContentStore = create<ContentStore>((set) => ({
  podcasts: initialPodcasts,
  addPodcast: (episode) => set((state) => ({ podcasts: [episode, ...state.podcasts] })),
  setPodcasts: (episodes) => set({ podcasts: episodes }),
}));