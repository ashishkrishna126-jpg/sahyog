import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';
import { useContentStore } from '../store/useContentStore';
import { useStoryStore } from '../store/useStoryStore';
import { PodcastCategory, PodcastEpisode, Story } from '../types';
import { 
  uploadFile, 
  addPodcast as savePodcast, 
  getPodcasts,
  deletePodcast,
  getAudioMetadata,
  getStories,
  updateStoryStatus as updateStoryStatusInDB,
  deleteStory,
  updatePodcast
} from '../services/firebaseService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

type PodcastFormValues = {
  title: string;
  host: string;
  guest: string;
  category: PodcastCategory;
  date: string;
  duration: string;
  description: string;
  publishDate?: string;
};

const categoryLabels: Record<PodcastCategory, string> = {
  medical: 'Medical Insight',
  personal: 'Personal Journey',
  news: 'Community News',
  community: 'Community Voices',
};
const categoryEntries = Object.entries(categoryLabels) as [PodcastCategory, string][];

export default function Admin() {
  const { addPodcast, setPodcasts } = useContentStore();
  const { stories, updateStoryStatus, setStories } = useStoryStore();
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [existingPodcasts, setExistingPodcasts] = useState<PodcastEpisode[]>([]);
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(true);
  const [audioMetadata, setAudioMetadata] = useState<{ duration: string; size: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'publish' | 'manage' | 'moderate' | 'published'>('publish');
  const [isLoadingStories, setIsLoadingStories] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<PodcastEpisode | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // Auto sign-in with the admin email
    const adminEmail = 'ashishkrishna126@gmail.com';
    const adminPassword = prompt('Enter admin password to access Admin Panel:');
    
    if (!adminPassword) {
      // User cancelled or entered empty password
      setIsAuthenticating(false);
      setIsAuthenticated(false);
      showNotification('error', '❌ Authentication required. Redirecting...');
      setTimeout(() => window.location.href = '/', 2000);
      return;
    }

    signInWithEmailAndPassword(auth, adminEmail, adminPassword)
      .then(() => {
        setIsAuthenticated(true);
        setIsAuthenticating(false);
        showNotification('success', '✅ Authenticated successfully!');
        loadPodcasts();
        loadStories();
      })
      .catch((error) => {
        console.error('Auth error:', error);
        setIsAuthenticated(false);
        setIsAuthenticating(false);
        showNotification('error', '❌ Authentication failed. Wrong password. Redirecting...');
        setTimeout(() => window.location.href = '/', 3000);
      });
  }, []);

  const loadPodcasts = async () => {
    try {
      setIsLoadingPodcasts(true);
      const podcasts = await getPodcasts();
      setExistingPodcasts(podcasts);
      setPodcasts(podcasts);
    } catch (error) {
      console.error('Error loading podcasts:', error);
      showNotification('error', 'Failed to load podcasts');
    } finally {
      setIsLoadingPodcasts(false);
    }
  };

  const loadStories = async () => {
    try {
      setIsLoadingStories(true);
      const allStories = await getStories() as Story[];
      setStories(allStories);
      showNotification('info', `Loaded ${allStories.filter(s => s.status === 'pending').length} pending stories`);
    } catch (error) {
      console.error('Error loading stories:', error);
      showNotification('error', 'Failed to load stories');
    } finally {
      setIsLoadingStories(false);
    }
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };
  
  const pendingStories = useMemo(
    () => stories.filter((story) => story.status === 'pending'),
    [stories]
  );

  const approvedStories = useMemo(
    () => stories.filter((story) => story.status === 'approved'),
    [stories]
  );

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PodcastFormValues>({
    defaultValues: {
      category: 'personal',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: '',
    },
  });

  const handleAudioFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAudioFile(null);
      setAudioMetadata(null);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      showNotification('error', 'Please select a valid audio file');
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      showNotification('error', 'File size must be less than 100MB');
      return;
    }

    setAudioFile(file);

    // Auto-detect duration
    try {
      const metadata = await getAudioMetadata(file);
      setAudioMetadata(metadata);
      setValue('duration', metadata.duration);
      showNotification('info', `Audio duration detected: ${metadata.duration}`);
    } catch (error) {
      console.error('Error reading audio metadata:', error);
      showNotification('error', 'Could not detect audio duration');
    }
  };

  const onSubmitPodcast = async (data: PodcastFormValues) => {
    // Validate required fields
    if (!data.title.trim()) {
      showNotification('error', 'Title is required');
      return;
    }
    if (!data.host.trim()) {
      showNotification('error', 'Host name is required');
      return;
    }
    if (!data.guest.trim()) {
      showNotification('error', 'Guest name is required');
      return;
    }
    if (!data.description.trim()) {
      showNotification('error', 'Description is required');
      return;
    }
    if (!audioFile) {
      showNotification('error', 'Please select an audio file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload audio file to Firebase Storage
      const timestamp = Date.now();
      const fileName = `${timestamp}-${audioFile.name.replace(/[^a-zA-Z0-9.]/g, '-')}`;
      const audioUrl = await uploadFile(
        audioFile,
        `podcasts/${fileName}`,
        (progress) => setUploadProgress(progress)
      );

      // Save podcast data to Firestore
      await savePodcast({
        title: data.title.trim(),
        host: data.host.trim(),
        guest: data.guest.trim(),
        category: data.category,
        language: 'en',
        date: data.date,
        duration: data.duration || 'N/A',
        description: data.description.trim(),
        audioUrl,
        createdAt: new Date() as any,
      });

      // Also add to local store for immediate display
      const newEpisode: PodcastEpisode = {
        id: crypto.randomUUID?.() ?? `pod-${timestamp}`,
        title: data.title.trim(),
        host: data.host.trim(),
        guest: data.guest.trim(),
        category: data.category,
        language: 'en',
        date: data.date,
        duration: data.duration || 'N/A',
        description: data.description.trim(),
        audioUrl,
        createdAt: new Date(),
      };

      addPodcast(newEpisode);
      showNotification('success', '✅ Podcast published successfully!');
      reset({
        category: 'personal',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        duration: '',
        title: '',
        host: '',
        guest: '',
        description: '',
      });
      setAudioFile(null);
      setAudioMetadata(null);
      setUploadProgress(0);
      loadPodcasts();
    } catch (error) {
      console.error('Error uploading podcast:', error);
      showNotification('error', '❌ Error uploading podcast. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePodcast = async (podcast: PodcastEpisode) => {
    if (!confirm(`Are you sure you want to delete "${podcast.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      showNotification('info', 'Deleting podcast...');
      await deletePodcast(podcast.id, podcast.audioUrl);
      showNotification('success', '✅ Podcast and audio file deleted successfully');
      loadPodcasts();
    } catch (error: any) {
      console.error('Error deleting podcast:', error);
      const errorMessage = error?.message || 'Failed to delete podcast';
      showNotification('error', `❌ ${errorMessage}`);
    }
  };

  const handleDecision = async (story: Story, status: Story['status']) => {
    try {
      // Update in Firestore
      await updateStoryStatusInDB(story.id, status);
      
      // Update local state
      updateStoryStatus(story.id, status);
      
      // Remove from pending list by reloading stories
      await loadStories();
      
      showNotification('success', `✅ Story ${status === 'approved' ? 'approved and published' : 'rejected'}.`);
    } catch (error) {
      console.error('Error updating story status:', error);
      showNotification('error', '❌ Failed to update story status. Please try again.');
    }
  };

  const handleDeleteStory = async (story: Story) => {
    if (!confirm(`Are you sure you want to delete the story by "${story.nickname || 'Anonymous'}"?`)) {
      return;
    }
    
    try {
      await deleteStory(story.id);
      await loadStories();
      showNotification('success', '🗑️ Story deleted successfully.');
    } catch (error) {
      console.error('Error deleting story:', error);
      showNotification('error', '❌ Failed to delete story. Please try again.');
    }
  };

  const handleEditPodcast = (podcast: PodcastEpisode) => {
    setEditingPodcast(podcast);
    // Pre-fill the form with existing data
    setValue('title', podcast.title);
    setValue('host', podcast.host);
    setValue('guest', podcast.guest);
    setValue('category', podcast.category);
    setValue('date', podcast.date);
    setValue('duration', podcast.duration);
    setValue('description', podcast.description);
    setActiveTab('manage'); // Stay on manage tab
  };

  const handleUpdatePodcast = async (data: PodcastFormValues) => {
    if (!editingPodcast) return;

    setIsUpdating(true);
    try {
      await updatePodcast(editingPodcast.id, {
        title: data.title.trim(),
        host: data.host.trim(),
        guest: data.guest.trim(),
        category: data.category,
        language: editingPodcast.language, // Keep existing or allow change
        date: data.date,
        duration: data.duration || editingPodcast.duration,
        description: data.description.trim(),
        audioUrl: editingPodcast.audioUrl,
        createdAt: editingPodcast.createdAt as any,
      });

      showNotification('success', '✅ Podcast updated successfully!');
      setEditingPodcast(null);
      loadPodcasts();
    } catch (error) {
      console.error('Error updating podcast:', error);
      showNotification('error', '❌ Failed to update podcast. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const cancelEdit = () => {
    setEditingPodcast(null);
  };

  const getNotificationColor = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'error': return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
    }
  };

  // Show loading screen while authenticating
  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-xl font-bold">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Block access if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-black mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-6">Authentication failed. You will be redirected to the homepage.</p>
          {notification && (
            <div className={`px-6 py-4 rounded-2xl text-sm font-semibold ${getNotificationColor(notification.type)}`}>
              {notification.message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/90 backdrop-blur">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <RedRibbon size="sm" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Admin</p>
                <h1 className="text-lg font-black text-white">Content Control Center</h1>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Tabs Navigation */}
        <div className="container mx-auto px-6 pt-6">
          <div className="flex gap-4 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('publish')}
              className={`px-6 py-2 rounded-t-lg font-bold transition-colors ${
                activeTab === 'publish'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              📝 Publish Podcast
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-2 rounded-t-lg font-bold transition-colors ${
                activeTab === 'manage'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              🗂️ Manage Podcasts ({existingPodcasts.length})
            </button>
            <button
              onClick={() => setActiveTab('moderate')}
              className={`px-6 py-2 rounded-t-lg font-bold transition-colors ${
                activeTab === 'moderate'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              ✅ Moderate Stories ({pendingStories.length})
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-6 py-2 rounded-t-lg font-bold transition-colors ${
                activeTab === 'published'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              📚 Published Stories ({approvedStories.length})
            </button>
          </div>
        </div>

        <main className="container mx-auto px-6 py-8 space-y-10">
          {/* Notification */}
          {notification && (
            <div className={`px-6 py-4 rounded-2xl text-sm font-semibold ${getNotificationColor(notification.type)}`}>
              {notification.message}
            </div>
          )}

          {/* Publish Tab */}
          {activeTab === 'publish' && (
            <section className="bg-slate-800/70 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-black">📻 Publish New Podcast</h2>
                  <p className="text-slate-400 mt-1">Upload audio file and enter episode details. Duration is auto-detected from MP3.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmitPodcast)} className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-300">
                    Episode Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className={`bg-white/10 border ${errors.title ? 'border-rose-500' : 'border-white/10'} rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none`}
                    placeholder="Voices of Resilience"
                  />
                  {errors.title && <span className="text-rose-400 text-xs mt-1">{errors.title.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-300">
                    Host <span className="text-rose-400">*</span>
                  </label>
                  <input
                    {...register('host', { required: 'Host is required' })}
                    className={`bg-white/10 border ${errors.host ? 'border-rose-500' : 'border-white/10'} rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none`}
                    placeholder="Dr. Sarah"
                  />
                  {errors.host && <span className="text-rose-400 text-xs mt-1">{errors.host.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-300">
                    Guest / Panel <span className="text-rose-400">*</span>
                  </label>
                  <input
                    {...register('guest', { required: 'Guest is required' })}
                    className={`bg-white/10 border ${errors.guest ? 'border-rose-500' : 'border-white/10'} rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none`}
                    placeholder="Community Workers Panel"
                  />
                  {errors.guest && <span className="text-rose-400 text-xs mt-1">{errors.guest.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-300">Category</label>
                  <select
                    {...register('category', { required: true })}
                    className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 outline-none"
                  >
                    {categoryEntries.map(([value, label]) => (
                      <option key={value} value={value} className="bg-slate-800">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-300">Recording Date</label>
                  <input
                    {...register('date', { required: true })}
                    className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-300">
                    Duration {audioMetadata && <span className="text-emerald-400">(Auto-detected)</span>}
                  </label>
                  <input
                    {...register('duration')}
                    placeholder="Auto-detected from audio"
                    readOnly={!!audioMetadata}
                    className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-300">
                    Audio File <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="audio/*,.mp3,.m4a,.wav"
                      onChange={handleAudioFileChange}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-400 cursor-pointer"
                      disabled={isUploading}
                    />
                    {audioFile && audioMetadata && (
                      <div className="mt-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                        <p className="text-xs text-emerald-300 font-mono">
                          📁 {audioFile.name}
                        </p>
                        <p className="text-xs text-emerald-300 font-mono mt-1">
                          💾 Size: {(audioMetadata.size / 1024 / 1024).toFixed(2)} MB | ⏱️ Duration: {audioMetadata.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {isUploading && uploadProgress > 0 && (
                  <div className="md:col-span-2">
                    <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-green-400 h-full transition-all duration-300 flex items-center justify-center"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        <span className="text-xs font-bold text-white">{uploadProgress.toFixed(0)}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-2">⬆️ Uploading to Firebase Storage...</p>
                  </div>
                )}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-300">
                    Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={4}
                    className={`bg-white/10 border ${errors.description ? 'border-rose-500' : 'border-white/10'} rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none resize-none`}
                    placeholder="Describe the episode content, key topics discussed, and what listeners will learn..."
                  />
                  {errors.description && <span className="text-rose-400 text-xs mt-1">{errors.description.message}</span>}
                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setAudioFile(null);
                      setAudioMetadata(null);
                    }}
                    className="bg-slate-700 text-white font-bold px-8 py-3 rounded-2xl hover:bg-slate-600 transition-colors"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading || !audioFile}
                    className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:bg-emerald-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                  >
                    {isUploading ? `⬆️ Uploading ${uploadProgress.toFixed(0)}%...` : '✅ Publish Podcast'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Manage Podcasts Tab */}
          {activeTab === 'manage' && (
            <section className="bg-slate-800/60 border border-white/10 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black">🗂️ Manage Published Podcasts</h2>
                  <p className="text-slate-400">View, edit, or delete existing podcast episodes</p>
                </div>
                <button
                  onClick={loadPodcasts}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 transition-colors"
                >
                  🔄 Refresh
                </button>
              </div>

              {isLoadingPodcasts ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                  <p className="mt-4 text-slate-400">Loading podcasts...</p>
                </div>
              ) : existingPodcasts.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8 text-center">
                  <p className="text-lg text-slate-400">No podcasts published yet</p>
                  <button
                    onClick={() => setActiveTab('publish')}
                    className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400"
                  >
                    Publish First Podcast
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {existingPodcasts.map((podcast) => (
                    <div key={podcast.id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{podcast.title}</h3>
                            <span className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-bold rounded-full uppercase">
                              {podcast.category}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mb-3">
                            🎙️ Host: {podcast.host} | 🗣️ Guest: {podcast.guest}
                          </p>
                          <p className="text-sm text-slate-300 leading-relaxed mb-3">{podcast.description}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                            <span>📅 {podcast.date}</span>
                            <span>⏱️ {podcast.duration}</span>
                            <span>🔊 {podcast.audioUrl ? 'Audio uploaded' : 'No audio'}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleEditPodcast(podcast)}
                            className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-400 transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => window.open(podcast.audioUrl, '_blank')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-400 transition-colors"
                          >
                            ▶ Play
                          </button>
                          <button
                            onClick={() => handleDeletePodcast(podcast)}
                            className="px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-400 transition-colors"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Edit Podcast Modal */}
          {editingPodcast && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800 border border-white/10 rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                key={editingPodcast.id}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-black text-white">✏️ Edit Podcast</h2>
                  <button
                    onClick={cancelEdit}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit(handleUpdatePodcast)} className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-300">Episode Title *</label>
                    <input
                      {...register('title', { required: 'Title is required' })}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-300">Host *</label>
                    <input
                      {...register('host', { required: 'Host is required' })}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-300">Guest / Panel *</label>
                    <input
                      {...register('guest', { required: 'Guest is required' })}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-300">Category</label>
                    <select
                      {...register('category')}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 outline-none text-white"
                    >
                      {categoryEntries.map(([value, label]) => (
                        <option key={value} value={value} className="bg-slate-800">
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-300">Recording Date</label>
                    <input
                      {...register('date')}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-300">Duration</label>
                    <input
                      {...register('duration')}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-300">Description *</label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={4}
                      className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none resize-none text-white"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-slate-700 text-white font-bold px-8 py-3 rounded-2xl hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:bg-emerald-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? '⏳ Updating...' : '✅ Save Changes'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Moderate Stories Tab */}
          {activeTab === 'moderate' && (
            <section className="bg-slate-800/60 border border-white/10 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Content Moderation</p>
                  <h2 className="text-3xl font-black">✅ Pending Articles</h2>
                  <p className="text-slate-400">Approve stories before they appear on the Stories wall.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={loadStories}
                    disabled={isLoadingStories}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 transition-colors disabled:opacity-50"
                  >
                    {isLoadingStories ? '🔄 Loading...' : '🔄 Refresh'}
                  </button>
                  <span className="text-sm text-slate-400">{pendingStories.length} pending</span>
                </div>
              </div>
              <div className="space-y-4">
                {isLoadingStories ? (
                  <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                    <p className="mt-4 text-slate-400">Loading stories...</p>
                  </div>
                ) : pendingStories.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-400">
                    ✨ No pending articles. New contributions will appear here once submitted.
                  </div>
                ) : (
                  pendingStories.map((story) => (
                    <div key={story.id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold">{story.nickname || 'Anonymous'}</p>
                          <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">
                            {story.theme} • {story.language.toUpperCase()}
                          </p>
                        </div>
                        <span className="text-xs text-slate-500">
                          {new Date(story.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {story.storyText}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDecision(story, 'approved')}
                          className="flex-1 bg-emerald-500 text-slate-900 font-bold rounded-2xl px-4 py-2 hover:bg-emerald-400 transition-colors"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleDecision(story, 'rejected')}
                          className="flex-1 bg-rose-500 text-white font-bold rounded-2xl px-4 py-2 hover:bg-rose-400 transition-colors"
                        >
                          ❌ Reject
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story)}
                          className="bg-slate-700 text-white font-bold rounded-2xl px-4 py-2 hover:bg-slate-600 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* Published Stories Tab */}
          {activeTab === 'published' && (
            <section className="relative">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black">📚 Published Stories</h3>
                    <p className="text-sm text-slate-400 mt-1">Manage approved stories visible on the website</p>
                  </div>
                  <button
                    onClick={loadStories}
                    disabled={isLoadingStories}
                    className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-400 transition-colors disabled:opacity-50"
                  >
                    {isLoadingStories ? '⏳ Loading...' : '🔄 Refresh'}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {isLoadingStories ? (
                  <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                    <p className="mt-4 text-slate-400">Loading stories...</p>
                  </div>
                ) : approvedStories.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-400">
                    📭 No published stories yet. Approved stories will appear here.
                  </div>
                ) : (
                  approvedStories.map((story) => (
                    <div key={story.id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold">{story.nickname || 'Anonymous'}</p>
                          <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">
                            {story.theme} • {story.language.toUpperCase()}
                          </p>
                        </div>
                        <span className="text-xs text-slate-500">
                          {new Date(story.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {story.storyText}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDecision(story, 'pending')}
                          className="flex-1 bg-yellow-500 text-slate-900 font-bold rounded-2xl px-4 py-2 hover:bg-yellow-400 transition-colors"
                        >
                          ⏸️ Unpublish
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story)}
                          className="bg-rose-600 text-white font-bold rounded-2xl px-4 py-2 hover:bg-rose-500 transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
