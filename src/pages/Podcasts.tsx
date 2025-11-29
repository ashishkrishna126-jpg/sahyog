import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';
import { useContentStore } from '../store/useContentStore';
import { PodcastCategory } from '../types';
import { getPodcasts } from '../services/firebaseService';

const categoryIcons: Record<PodcastCategory, string> = {
  medical: '🔬',
  personal: '🎙️',
  news: '🗞️',
  community: '🌍',
};

const languageNames: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ml: 'Malayalam',
  ta: 'Tamil',
  kn: 'Kannada',
  te: 'Telugu',
};

export default function Podcasts() {
  const [activeCategory, setActiveCategory] = useState<'all' | PodcastCategory>('all');
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const podcasts = useContentStore((state) => state.podcasts);
  const setPodcasts = useContentStore((state) => state.setPodcasts);
  
  const latestPodcast = podcasts.length > 0 ? podcasts[0] : null;

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setError(null);
        const firebasePodcasts = await getPodcasts();
        console.log('Fetched podcasts:', firebasePodcasts.length);
        setPodcasts(firebasePodcasts);
      } catch (error: any) {
        console.error('Error fetching podcasts:', error);
        setError(`Failed to load podcasts: ${error.message || 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [setPodcasts]);

  const filteredEpisodes = activeCategory === 'all'
    ? podcasts
    : podcasts.filter(ep => ep.category === activeCategory);

  const handlePlayPause = (episodeId: string, audioUrl: string) => {
    if (playingEpisode === episodeId) {
      // Pause current audio
      audioPlayer?.pause();
      setPlayingEpisode(null);
    } else {
      // Stop previous audio if any
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
      
      // Create and play new audio - simple HTML5 audio
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      
      // Update time
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      
      audio.onerror = (e) => {
        console.error('Audio error:', e);
        alert('Failed to load audio. Please check the file.');
      };
      
      // Play audio
      audio.play()
        .then(() => {
          console.log('Audio playing successfully');
          setAudioPlayer(audio);
          setPlayingEpisode(episodeId);
        })
        .catch(err => {
          console.error('Play error:', err);
          alert('Failed to play audio: ' + err.message);
        });

      // Reset playing state when audio ends
      audio.onended = () => {
        setPlayingEpisode(null);
        setAudioPlayer(null);
        setCurrentTime(0);
      };
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-850">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              SAHYOG Podcasts
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/stories" className="text-sm font-bold text-slate-600 hover:text-primary-600">Stories</Link>
            <Link to="/games" className="text-sm font-bold text-slate-600 hover:text-primary-600">Games</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900 z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 font-bold text-sm mb-6">
                New Episode Every Week
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Listen to the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-rose-400">
                  Voices of Change
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                Real conversations about HIV, health, stigma, and hope. Join us as we break barriers one episode at a time.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => latestPodcast && handlePlayPause(latestPodcast.id, latestPodcast.audioUrl)}
                  disabled={!latestPodcast}
                  className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{playingEpisode === latestPodcast?.id ? '⏸' : '▶'}</span> 
                  {playingEpisode === latestPodcast?.id ? 'Pause' : 'Listen to Latest'}
                </button>
                <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 shadow-2xl max-w-md mx-auto">
                <div className="aspect-square bg-slate-800 rounded-2xl mb-6 flex items-center justify-center text-8xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-700" />
                  {playingEpisode === latestPodcast?.id ? (
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                      {[...Array(7)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 bg-primary-400 rounded-full"
                          animate={{
                            height: ['30%', '90%', '50%', '100%', '40%'],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-30">
                      {[...Array(7)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 bg-primary-400 rounded-full"
                          animate={{
                            height: ['30%', '90%', '50%', '100%', '40%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <span className="relative z-10">{latestPodcast ? categoryIcons[latestPodcast.category] : '🎙️'}</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-700 rounded-full w-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 transition-all duration-200" 
                      style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{latestPodcast?.duration || formatTime(duration)}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {latestPodcast?.title || 'No Podcasts Available'}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {latestPodcast ? `${latestPodcast.host} & ${latestPodcast.guest}` : 'Upload a podcast to get started'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-slate-100 sticky top-[73px] bg-white/95 backdrop-blur z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 justify-start md:justify-center">
            {['all', 'medical', 'personal', 'news', 'community'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-2 rounded-full font-bold text-sm capitalize transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">Loading podcasts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-8 max-w-2xl mx-auto">
                <p className="text-rose-600 text-lg font-bold mb-4">⚠️ Error Loading Podcasts</p>
                <p className="text-slate-700 mb-6">{error}</p>
                <div className="bg-white rounded-xl p-4 text-left">
                  <p className="text-sm font-bold text-slate-800 mb-2">💡 To fix this:</p>
                  <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                    <li>Go to Firebase Console → Firestore Database → Rules</li>
                    <li>Set rules to allow read access for podcasts collection</li>
                    <li>Click "Publish" to apply changes</li>
                  </ol>
                </div>
              </div>
            </div>
          ) : filteredEpisodes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No podcasts found in this category.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700"
              >
                View All Podcasts
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredEpisodes.map((episode) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-white p-6 rounded-2xl shadow-sm border transition-all flex flex-col md:flex-row gap-6 items-center md:items-start ${
                  playingEpisode === episode.id 
                    ? 'border-primary-400 shadow-lg shadow-primary-100 ring-2 ring-primary-100' 
                    : 'border-slate-100 hover:shadow-md'
                }`}
              >
                <div className={`w-32 h-32 rounded-xl flex-shrink-0 flex items-center justify-center text-5xl relative overflow-hidden ${
                  playingEpisode === episode.id ? 'bg-gradient-to-br from-primary-50 to-purple-50' : 'bg-slate-100'
                }`}>
                  {playingEpisode === episode.id && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1 z-0">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-primary-400 rounded-full"
                          animate={{
                            height: ['20%', '80%', '40%', '90%', '30%'],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <span className="relative z-10">{categoryIcons[episode.category]}</span>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
                      {episode.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                      🌐 {languageNames[episode.language] || episode.language}
                    </span>
                    <span className="text-slate-400 text-xs font-bold flex items-center">
                      🗓️ {episode.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{episode.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed max-w-2xl">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1">👤 Host: {episode.host}</span>
                    <span className="flex items-center gap-1">🗣️ Guest: {episode.guest}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button 
                    onClick={() => handlePlayPause(episode.id, episode.audioUrl)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${
                      playingEpisode === episode.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20'
                    }`}
                  >
                    {playingEpisode === episode.id ? '⏸' : '▶'}
                  </button>
                  <p className="text-xs text-slate-500 mt-2 text-center">{episode.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
