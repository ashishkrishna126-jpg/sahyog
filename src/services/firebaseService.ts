import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Upload file to Firebase Storage
export const uploadFile = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// Add podcast to Firestore
export interface PodcastData {
  title: string;
  host: string;
  guest: string;
  category: string;
  date: string;
  duration: string;
  description: string;
  audioUrl: string;
  createdAt: Timestamp;
}

export const addPodcast = async (podcastData: PodcastData) => {
  try {
    const docRef = await addDoc(collection(db, 'podcasts'), {
      ...podcastData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding podcast:', error);
    throw error;
  }
};

// Get all podcasts
export const getPodcasts = async () => {
  try {
    const q = query(collection(db, 'podcasts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting podcasts:', error);
    throw error;
  }
};

// Add story to Firestore
export interface StoryData {
  title: string;
  content: string;
  category: string;
  nickname?: string;
  language: string;
  theme: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
}

export const addStory = async (storyData: StoryData) => {
  try {
    const docRef = await addDoc(collection(db, 'stories'), {
      ...storyData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding story:', error);
    throw error;
  }
};

// Get all stories
export const getStories = async (status?: 'pending' | 'approved' | 'rejected') => {
  try {
    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const stories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    if (status) {
      return stories.filter((story: any) => story.status === status);
    }
    return stories;
  } catch (error) {
    console.error('Error getting stories:', error);
    throw error;
  }
};
