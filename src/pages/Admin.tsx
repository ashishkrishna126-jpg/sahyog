import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';
import { useContentStore } from '../store/useContentStore';
import { useStoryStore } from '../store/useStoryStore';
import { PodcastCategory, PodcastEpisode, Story } from '../types';
import { uploadFile, addPodcast as savePodcast } from '../services/firebaseService';
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
  audioUrl: string;
};

const categoryLabels: Record<PodcastCategory, string> = {
  medical: 'Medical Insight',
  personal: 'Personal Journey',
  news: 'Community News',
  community: 'Community Voices',
};
const categoryEntries = Object.entries(categoryLabels) as [PodcastCategory, string][];

export default function Admin() {
  const { addPodcast } = useContentStore();
  const { stories, updateStoryStatus } = useStoryStore();
  const [notification, setNotification] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Auto sign-in with the admin email
    const adminEmail = 'ashishkrishna126@gmail.com';
    const adminPassword = prompt('Enter admin password to enable uploads:');
    
    if (adminPassword) {
      signInWithEmailAndPassword(auth, adminEmail, adminPassword)
        .then(() => {
          setNotification('Authenticated successfully!');
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((error) => {
          console.error('Auth error:', error);
          setNotification('Authentication failed. Uploads will not work.');
        });
    }
  }, []);
  
  const pendingStories = useMemo(
    () => stories.filter((story) => story.status === 'pending'),
    [stories]
  );

  const { register, handleSubmit, reset } = useForm<PodcastFormValues>({
    defaultValues: {
      category: 'personal',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: '30:00',
      audioUrl: '',
    },
  });

  const onSubmitPodcast = async (data: PodcastFormValues) => {
    if (!audioFile) {
      setNotification('Please select an audio file');
      setTimeout(() => setNotification(null), 3000);
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
        title: data.title,
        host: data.host,
        guest: data.guest,
        category: data.category,
        date: data.date,
        duration: data.duration,
        description: data.description,
        audioUrl,
        createdAt: new Date() as any,
      });

      // Also add to local store for immediate display
      const newEpisode: PodcastEpisode = {
        id: crypto.randomUUID?.() ?? `pod-${timestamp}`,
        title: data.title,
        host: data.host,
        guest: data.guest,
        category: data.category,
        date: data.date,
        duration: data.duration,
        description: data.description,
        audioUrl,
        createdAt: new Date(),
      };

      addPodcast(newEpisode);
      setNotification('Podcast published successfully!');
      reset({ ...data, title: '', guest: '', description: '' });
      setAudioFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error uploading podcast:', error);
      setNotification('Error uploading podcast. Please try again.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDecision = (story: Story, status: Story['status']) => {
    updateStoryStatus(story.id, status);
    setNotification(`Story ${status === 'approved' ? 'published' : 'rejected'}.`);
    setTimeout(() => setNotification(null), 3000);
  };

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

        <main className="container mx-auto px-6 py-12 space-y-10">
          <section className="bg-slate-800/70 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-black">Publish New Podcast</h2>
                <p className="text-slate-400 mt-1">Upload voice records and headline details so visitors hear the latest episodes instantly.</p>
              </div>
              {notification && (
                <div className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm">
                  {notification}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmitPodcast)} className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-300">Episode Title</label>
                <input
                  {...register('title', { required: true })}
                  className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Voices of Resilience"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-300">Host</label>
                <input
                  {...register('host', { required: true })}
                  className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Dr. Sarah"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-300">Guest / Panel</label>
                <input
                  {...register('guest', { required: true })}
                  className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Community Workers Panel"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-300">Category</label>
                <select
                  {...register('category', { required: true })}
                  className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 outline-none"
                >
                  {categoryEntries.map(([value, label]) => (
                    <option key={value} value={value}>
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
                <label className="text-sm font-semibold text-slate-300">Duration</label>
                <input
                  {...register('duration', { required: true })}
                  placeholder="45:20"
                  className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-slate-300">Audio File *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="audio/*,.mp3,.m4a,.wav"
                    onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                    className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-400 cursor-pointer"
                    disabled={isUploading}
                  />
                  {audioFile && (
                    <p className="mt-2 text-xs text-emerald-300">
                      Selected: {audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
              {isUploading && uploadProgress > 0 && (
                <div className="md:col-span-2">
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Uploading: {uploadProgress.toFixed(0)}%</p>
                </div>
              )}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-slate-300">Description</label>
                <textarea
                  {...register('description', { required: true })}
                  rows={3}
                  className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 focus:border-primary-400 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isUploading || !audioFile}
                  className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:bg-emerald-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  {isUploading ? `Uploading ${uploadProgress.toFixed(0)}%...` : 'Publish to Podcasts'}
                </button>
              </div>
            </form>
          </section>

          <section className="bg-slate-800/60 border border-white/10 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Content Moderation</p>
                <h2 className="text-3xl font-black">Pending Articles</h2>
                <p className="text-slate-400">Approve stories before they appear on the Stories wall.</p>
              </div>
              <span className="text-sm text-slate-400">{pendingStories.length} pending</span>
            </div>
            <div className="space-y-4">
              {pendingStories.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-400">
                  No pending articles. New contributions will appear here once submitted.
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
                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {story.storyText}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDecision(story, 'approved')}
                        className="flex-1 bg-emerald-500 text-slate-900 font-bold rounded-2xl px-4 py-2 hover:bg-emerald-400 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecision(story, 'rejected')}
                        className="flex-1 bg-rose-500 text-white font-bold rounded-2xl px-4 py-2 hover:bg-rose-400 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}