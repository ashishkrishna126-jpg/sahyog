import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';
import { useStoryStore } from '../store/useStoryStore';
import { Story, StoryTheme, StoryReactions } from '../types';
import { getStories, addStory as saveStory } from '../services/firebaseService';

// Initial sample stories
const initialStories: Story[] = [
  {
    id: '1',
    nickname: 'Hope Bearer',
    ageRange: '25-34',
    state: 'Kerala',
    language: 'en',
    theme: 'success',
    storyText: 'After my diagnosis 5 years ago, I thought my life was over. Today, with proper treatment and support, I live a normal, healthy life. I work, travel, and help others. HIV does not define me—my courage does. The medication is simple, just one pill a day, and it keeps me undetectable. To anyone newly diagnosed: breathe. It gets better.',
    tags: ['Undetectable', 'LivingPositively'],
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    reactions: { stayStrong: 120, weStandWithYou: 85, youInspireMe: 200 },
  },
  {
    id: '2',
    nickname: 'Warrior Mom',
    ageRange: '35-44',
    state: 'Tamil Nadu',
    language: 'en',
    theme: 'support',
    storyText: 'Finding a support group changed everything. Learning that I wasn\'t alone, hearing others\' experiences, and sharing mine—it transformed my journey. We lift each other up every single day. My children are HIV negative because of the treatment I took during pregnancy. Science is a miracle.',
    tags: ['Motherhood', 'SupportGroup'],
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
    reactions: { stayStrong: 150, weStandWithYou: 300, youInspireMe: 180 },
  },
  {
    id: '3',
    nickname: 'Silent Fighter',
    ageRange: '18-24',
    state: 'Karnataka',
    language: 'en',
    theme: 'stigma',
    storyText: 'I was terrified to tell my family. The stigma in our society is heavy. But when I finally gathered the courage, my brother just hugged me. He said, "You are still you." That moment broke the chains of fear I was living in. We need to talk more openly to end this stigma.',
    tags: ['Family', 'BreakingStigma'],
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    reactions: { stayStrong: 400, weStandWithYou: 250, youInspireMe: 120 },
  },
];

const themeColors: Record<StoryTheme, { bg: string; border: string; badge: string; icon: string }> = {
  diagnosis: { bg: 'from-rose-50 to-rose-100', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-700', icon: '🏥' },
  treatment: { bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', icon: '💊' },
  stigma: { bg: 'from-slate-50 to-slate-100', border: 'border-slate-200', badge: 'bg-slate-100 text-slate-700', icon: '🛡️' },
  success: { bg: 'from-green-50 to-green-100', border: 'border-green-200', badge: 'bg-green-100 text-green-700', icon: '🌟' },
  mentalHealth: { bg: 'from-purple-50 to-purple-100', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', icon: '🧠' },
  support: { bg: 'from-amber-50 to-amber-100', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: '🤝' },
};

export default function Stories() {
  const { t } = useTranslation();
  const { stories, addReaction, setStories } = useStoryStore();
  const [activeFilter, setActiveFilter] = useState<StoryTheme | 'all'>('all');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load approved stories from Firestore
  useEffect(() => {
    const loadApprovedStories = async () => {
      try {
        setIsLoading(true);
        const approvedStories = await getStories('approved');
        console.log('Loaded approved stories from Firestore:', approvedStories.length, approvedStories);
        // Merge with initial stories, giving priority to Firestore stories
        const allStories: Story[] = [...initialStories, ...approvedStories];
        // Remove duplicates by ID, preferring Firestore versions
        const uniqueStories: Story[] = Array.from(
          new Map(allStories.map(story => [story.id, story])).values()
        );
        console.log('Total unique stories after merge:', uniqueStories.length);
        setStories(uniqueStories);
      } catch (error) {
        console.error('Error loading stories:', error);
        // Fallback to initial stories if load fails
        setStories(initialStories);
      } finally {
        setIsLoading(false);
      }
    };
    loadApprovedStories();
  }, [setStories]);

  const approvedStories = stories.filter(story => story.status === 'approved');
  
  // Sort by latest created date first (newest first)
  const sortedApprovedStories = [...approvedStories].sort((a, b) => {
    const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
    const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });
  
  const filteredStories = activeFilter === 'all'
    ? sortedApprovedStories
    : sortedApprovedStories.filter(story => story.theme === activeFilter);
  const pendingCount = stories.filter(story => story.status === 'pending').length;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-850">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              {t('stories.title')}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
            >
              <span>✍️</span> Share Story
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent -z-10" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4 inline-block"
            >
              ❤️
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Real Stories. <span className="text-primary-600">Real Hope.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover the strength, resilience, and triumphs of people living with HIV. You are not alone in this journey.
            </p>
            {pendingCount > 0 && (
              <p className="text-sm text-primary-600 font-semibold mb-6">
                {pendingCount} new contribution{pendingCount > 1 ? 's' : ''} awaiting review.
              </p>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsShareModalOpen(true)}
              className="md:hidden bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary-600/30"
            >
              Share Your Story
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[73px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 overflow-x-auto">
        <div className="container mx-auto px-6">
          <div className="flex gap-3 min-w-max md:justify-center pb-2 md:pb-0">
            {['all', ...Object.keys(themeColors)].map((filter, idx) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveFilter(filter as StoryTheme | 'all')}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all border ${
                  activeFilter === filter
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace(/([A-Z])/g, ' $1')}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-6 py-12">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            <p className="mt-4 text-slate-600">Loading stories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story) => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onClick={() => setSelectedStory(story)}
                  onReact={(type) => addReaction(story.id, type)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {filteredStories.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No stories found</h3>
            <p className="text-slate-500">Be the first to share a story in this category!</p>
          </div>
        )}
      </section>

      {/* Modals */}
      <AnimatePresence>
        {isShareModalOpen && (
          <ShareStoryModal 
            onClose={() => setIsShareModalOpen(false)} 
            onSubmit={async (data) => {
              try {
                // Save to Firestore
                await saveStory({
                  nickname: data.nickname,
                  ageRange: data.ageRange,
                  state: data.state,
                  storyText: data.storyText,
                  theme: data.theme,
                  triggerWarning: data.triggerWarning,
                  language: 'en',
                  tags: [],
                });
                
                // Show success message
                alert('✅ Your story has been submitted for review. Thank you for sharing!');
                setIsShareModalOpen(false);
                
                // Reload stories after a short delay
                setTimeout(async () => {
                  const approvedStories = await getStories('approved');
                  const allStories: Story[] = [...initialStories, ...approvedStories];
                  const uniqueStories: Story[] = Array.from(
                    new Map(allStories.map(story => [story.id, story])).values()
                  );
                  setStories(uniqueStories);
                }, 1000);
              } catch (error) {
                console.error('Error submitting story:', error);
                alert('❌ Failed to submit story. Please try again.');
              }
            }} 
          />
        )}
        {selectedStory && (
          <StoryReaderModal 
            story={selectedStory} 
            onClose={() => setSelectedStory(null)}
            onReact={(type) => addReaction(selectedStory.id, type)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StoryCard({ story, onClick, onReact }: { story: Story; onClick: () => void; onReact: (type: keyof StoryReactions) => void }) {
  const theme = themeColors[story.theme];
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all cursor-pointer overflow-hidden`}
      onClick={onClick}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.bg} rounded-bl-full -mr-8 -mt-8 opacity-50 transition-transform group-hover:scale-110`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${theme.badge}`}>
            <span>{theme.icon}</span> {story.theme}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {new Date(story.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">{story.nickname || 'Anonymous'}</h3>
        <p className="text-xs text-slate-500 mb-4">{story.ageRange} • {story.state}</p>

        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-4">
          {story.storyText}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex gap-3">
            <ReactionButton count={story.reactions?.stayStrong} icon="💪" label="Stay Strong" onClick={(e) => { e.stopPropagation(); onReact('stayStrong'); }} />
            <ReactionButton count={story.reactions?.youInspireMe} icon="🌟" label="Inspiring" onClick={(e) => { e.stopPropagation(); onReact('youInspireMe'); }} />
          </div>
          <span className="text-primary-600 text-sm font-bold group-hover:translate-x-1 transition-transform">Read →</span>
        </div>
      </div>
    </motion.div>
  );
}

function ReactionButton({ count = 0, icon, label, onClick }: { count?: number; icon: string; label: string; onClick: (e: any) => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary-600 hover:bg-primary-50 px-2 py-1 rounded-lg transition-colors"
      title={label}
    >
      <span>{icon}</span>
      <span>{count}</span>
    </button>
  );
}

function ShareStoryModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: any) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-black text-slate-900">Share Your Story</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">✕</button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-6">
            🔒 Your privacy matters. Your story will be posted anonymously. You can choose a nickname or remain completely hidden.
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nickname (Optional)</label>
              <input {...register('nickname')} placeholder="e.g. Hope Warrior" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Age Range</label>
              <select {...register('ageRange', { required: true })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 outline-none bg-white">
                <option value="">Select...</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">State/Region</label>
              <input {...register('state', { required: true })} placeholder="e.g. Kerala" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Theme</label>
              <select {...register('theme', { required: true })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 outline-none bg-white">
                {Object.keys(themeColors).map(theme => (
                  <option key={theme} value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Your Story</label>
            <textarea 
              {...register('storyText', { required: true, minLength: 50 })} 
              rows={6} 
              placeholder="Share your journey, your struggles, and your triumphs..." 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
            />
            {errors.storyText && <span className="text-red-500 text-xs mt-1">Please write at least 50 characters.</span>}
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" {...register('triggerWarning')} id="tw" className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500" />
            <label htmlFor="tw" className="text-sm text-slate-600">This story contains sensitive content (Trigger Warning)</label>
          </div>

          <button type="submit" className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30">
            Post Anonymous Story
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function StoryReaderModal({ story, onClose, onReact }: { story: Story; onClose: () => void; onReact: (type: keyof StoryReactions) => void }) {
  const theme = themeColors[story.theme];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <div className={`h-32 bg-gradient-to-r ${theme.bg} relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-900 transition-colors backdrop-blur-sm">✕</button>
          <div className="absolute -bottom-10 left-8">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-4xl border-4 border-white">
              {theme.icon}
            </div>
          </div>
        </div>

        <div className="pt-14 px-8 pb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${theme.badge}`}>
              {story.theme}
            </span>
            {story.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                #{tag}
              </span>
            ))}
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-2">{story.nickname || 'Anonymous'}</h2>
          <p className="text-slate-500 font-medium mb-8 flex items-center gap-2">
            <span>📍 {story.state}</span>
            <span>•</span>
            <span>{story.ageRange} years old</span>
            <span>•</span>
            <span>{new Date(story.createdAt).toLocaleDateString()}</span>
          </p>

          <div className="prose prose-slate max-w-none mb-10">
            <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">{story.storyText}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-bold text-slate-700">Does this story resonate with you?</span>
            <div className="flex gap-3">
              <ReactionButton count={story.reactions?.stayStrong} icon="💪" label="Stay Strong" onClick={() => onReact('stayStrong')} />
              <ReactionButton count={story.reactions?.weStandWithYou} icon="🤝" label="With You" onClick={() => onReact('weStandWithYou')} />
              <ReactionButton count={story.reactions?.youInspireMe} icon="🌟" label="Inspiring" onClick={() => onReact('youInspireMe')} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}



