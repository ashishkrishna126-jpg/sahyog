import { collection, addDoc, getDocs, query, orderBy, Timestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
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
  language: string;
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
    console.log('Fetching podcasts from Firestore...');
    const q = query(collection(db, 'podcasts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    console.log('Raw query snapshot size:', querySnapshot.size);
    console.log('Documents:', querySnapshot.docs.map(d => ({ id: d.id, data: d.data() })));
    
    const podcasts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        host: data.host,
        guest: data.guest,
        category: data.category,
        language: data.language || 'en', // Default to English for old podcasts
        date: data.date,
        duration: data.duration,
        description: data.description,
        audioUrl: data.audioUrl,
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    });
    
    console.log('Mapped podcasts:', podcasts.length);
    return podcasts;
  } catch (error) {
    console.error('Error getting podcasts:', error);
    throw error;
  }
};

// Add story to Firestore
export interface StorySubmission {
  nickname?: string;
  ageRange?: string;
  state?: string;
  storyText: string;
  theme: string;
  triggerWarning?: boolean;
  language?: string;
  tags?: string[];
}

export const addStory = async (storyData: StorySubmission) => {
  try {
    const docRef = await addDoc(collection(db, 'stories'), {
      nickname: storyData.nickname || '',
      ageRange: storyData.ageRange || '',
      state: storyData.state || '',
      language: storyData.language || 'en',
      storyText: storyData.storyText,
      tags: storyData.tags || [],
      theme: storyData.theme,
      triggerWarning: storyData.triggerWarning || false,
      status: 'pending',
      createdAt: Timestamp.now(),
      reactions: { stayStrong: 0, weStandWithYou: 0, youInspireMe: 0 },
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
    console.log('Firestore query returned', querySnapshot.docs.length, 'documents');
    
    const stories = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log('Story document:', doc.id, data);
      return {
        id: doc.id,
        nickname: data.nickname,
        ageRange: data.ageRange,
        country: data.country,
        state: data.state,
        language: data.language || 'en',
        storyText: data.storyText,
        tags: data.tags || [],
        theme: data.theme,
        triggerWarning: data.triggerWarning,
        status: data.status,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        reactions: data.reactions || { stayStrong: 0, weStandWithYou: 0, youInspireMe: 0 },
      };
    });
    
    console.log('All stories before filtering:', stories.length, stories.map(s => ({ id: s.id, status: s.status })));
    
    if (status) {
      const filtered = stories.filter((story) => story.status === status);
      console.log(`Filtered stories with status '${status}':`, filtered.length, filtered);
      return filtered;
    }
    return stories;
  } catch (error) {
    console.error('Error getting stories:', error);
    throw error;
  }
};

// Update story status
export const updateStoryStatus = async (storyId: string, status: 'pending' | 'approved' | 'rejected') => {
  try {
    await updateDoc(doc(db, 'stories', storyId), {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating story status:', error);
    throw error;
  }
};

// Delete story
export const deleteStory = async (storyId: string) => {
  try {
    await deleteDoc(doc(db, 'stories', storyId));
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
};

// Delete podcast and its audio file
export const deletePodcast = async (podcastId: string, audioUrl: string) => {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, 'podcasts', podcastId));
    
    // Delete audio file from Storage
    if (audioUrl) {
      try {
        // Extract the file path from the download URL
        // URL format: https://firebasestorage.googleapis.com/v0/b/PROJECT/o/PATH?alt=media&token=...
        const url = new URL(audioUrl);
        const pathMatch = url.pathname.match(/\/o\/(.+)$/);
        
        if (pathMatch) {
          // Decode the path (Firebase Storage encodes it)
          const encodedPath = pathMatch[1];
          const decodedPath = decodeURIComponent(encodedPath);
          const audioRef = ref(storage, decodedPath);
          await deleteObject(audioRef);
          console.log('Audio file deleted from Storage');
        } else {
          console.warn('Could not extract path from audioUrl:', audioUrl);
        }
      } catch (storageError) {
        console.error('Error deleting audio file from Storage:', storageError);
        // Don't throw - Firestore deletion succeeded
      }
    }
  } catch (error) {
    console.error('Error deleting podcast:', error);
    throw error;
  }
};

// Update podcast
export const updatePodcast = async (podcastId: string, updates: Partial<PodcastData>) => {
  try {
    await updateDoc(doc(db, 'podcasts', podcastId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating podcast:', error);
    throw error;
  }
};

// Get audio file metadata (duration, size)
export const getAudioMetadata = (file: File): Promise<{ duration: string; size: number }> => {
  return new Promise((resolve) => {
    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    
    audio.onloadedmetadata = () => {
      const durationInSeconds = Math.floor(audio.duration);
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      resolve({
        duration,
        size: file.size,
      });
      
      URL.revokeObjectURL(audio.src);
    };
    
    audio.src = URL.createObjectURL(file);
  });
};
