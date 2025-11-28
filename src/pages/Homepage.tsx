import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';
import { useContentStore } from '../store/useContentStore';
import { getPodcasts } from '../services/firebaseService';

type MythStatement = {
  statement: string;
  detail: string;
  answer: boolean;
};

type PodcastHighlight = {
  title: string;
  guest: string;
  detail: string;
  duration: string;
  isComingSoon: boolean;
};

const keralaData = [
  { labelKey: 'keralaStats.items.newCases', value: '8,200' },
  { labelKey: 'keralaStats.items.treatment', value: '46,500' },
  { labelKey: 'keralaStats.items.patients', value: '12,800' },
];

const patientData = [
  { labelKey: 'patientStats.items.viralSuppression', value: '91%' },
  { labelKey: 'patientStats.items.support', value: '74%' },
  { labelKey: 'patientStats.items.retention', value: '88%' },
];

const comingSoonPlaceholders: PodcastHighlight[] = [
  {
    title: 'Episode Coming Soon',
    guest: 'TBA',
    detail: 'Stay tuned for more inspiring stories and expert insights.',
    duration: 'TBA',
    isComingSoon: true,
  },
  {
    title: 'Episode Coming Soon',
    guest: 'TBA',
    detail: 'New episodes featuring survivor stories and medical experts.',
    duration: 'TBA',
    isComingSoon: true,
  },
  {
    title: 'Episode Coming Soon',
    guest: 'TBA',
    detail: 'Join us for more conversations on HIV awareness and support.',
    duration: 'TBA',
    isComingSoon: true,
  },
];

export default function Homepage() {
  const { t } = useTranslation();
  const [lessonIndex, setLessonIndex] = useState(0);
  const navigate = useNavigate();
  const podcasts = useContentStore((state) => state.podcasts);
  const setPodcasts = useContentStore((state) => state.setPodcasts);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const firebasePodcasts = await getPodcasts();
        setPodcasts(firebasePodcasts);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };
    fetchPodcasts();
  }, [setPodcasts]);

  const mythStatements = useMemo(() => {
    return t('homepage.mythStatements', { returnObjects: true }) as MythStatement[];
  }, [t]);

  // Get top 3 latest podcasts or fill with coming soon
  const podcastHighlights: PodcastHighlight[] = useMemo(() => {
    const latestPodcasts: PodcastHighlight[] = podcasts.slice(0, 3).map((podcast) => ({
      title: podcast.title,
      guest: podcast.guest || 'SAHYOG Team',
      detail: podcast.description,
      duration: podcast.duration || 'TBA',
      isComingSoon: false,
    }));
    
    // Fill remaining slots with "Coming Soon"
    while (latestPodcasts.length < 3) {
      latestPodcasts.push(comingSoonPlaceholders[latestPodcasts.length]);
    }
    
    return latestPodcasts;
  }, [podcasts]);

  const currentLesson = mythStatements[lessonIndex] ?? mythStatements[0];

  const nextStatement = () => {
    if (mythStatements.length === 0) return;
    setLessonIndex((prev) => (prev + 1) % mythStatements.length);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans text-slate-850">
      <header className="border-b border-primary-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }} 
            className="flex items-center gap-4 flex-1 min-w-0"
          >
            <RedRibbon size="sm" className="flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-600 font-bold">SAHYOG</p>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-850 leading-tight break-words">
                Voices of Hope Podcast
              </h1>
            </div>
          </motion.div>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white py-24">
          {/* Animated background elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex justify-center mb-8">
                  <RedRibbon size="lg" />
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-850 mb-6 tracking-tight leading-tight">
                  Listen to the <span className="text-primary-600">Change</span>
                </h2>
                
                <p className="text-lg sm:text-xl text-slate-850/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Real stories, expert insights, and community voices breaking the silence on HIV. Your journey to awareness starts here.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/podcasts"
                    className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-colors inline-block flex items-center gap-2"
                  >
                    <span>▶</span> Tune In
                  </Link>
                  <Link
                    to="/stories"
                    className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-100 rounded-full font-bold hover:border-primary-200 hover:bg-primary-50 transition-colors inline-block"
                  >
                    Explore Stories
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="container mx-auto px-6 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Podcast Button */}
            <Link
              to="/podcasts"
              className="group relative overflow-hidden rounded-2xl bg-slate-900 p-8 shadow-xl border border-slate-800 hover:border-primary-500 transition-all block hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4 bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center">🎙️</div>
                <h3 className="text-xl font-bold text-white mb-2">Latest Episodes</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Tune in to expert talks and survivor stories.
                </p>
                <span className="text-primary-400 font-bold text-sm group-hover:translate-x-2 transition-transform inline-block">Listen Now →</span>
              </div>
            </Link>

            {/* Stories Button */}
            <Link
              to="/stories"
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl border border-slate-100 hover:border-primary-200 transition-all block hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4 bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center">❤️</div>
                <h3 className="text-xl font-bold text-slate-850 mb-2">Read Stories</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Discover real voices sharing their HIV journey. Be inspired.
                </p>
                <span className="text-primary-600 font-bold text-sm group-hover:translate-x-2 transition-transform inline-block">Explore Stories →</span>
              </div>
            </Link>

            {/* Share Story Button */}
            <Link
              to="/stories"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 p-8 shadow-xl text-white block hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4 bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center">✍️</div>
                <h3 className="text-xl font-bold mb-2">Share Your Story</h3>
                <p className="text-white/90 text-sm mb-4">
                  Share anonymously. Help others feel less alone.
                </p>
                <span className="font-bold text-sm group-hover:translate-x-2 transition-transform inline-block">Share Anonymously →</span>
              </div>
            </Link>

            {/* Dashboard Button */}
            <Link
              to="/dashboard"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl text-white block hover:-translate-y-2"
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4 bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">📊</div>
                <h3 className="text-xl font-bold mb-2">District Dashboard</h3>
                <p className="text-white/80 text-sm mb-4">
                  Track ICTC-reported cases across Kerala districts for the latest trends.
                </p>
                <span className="font-bold text-sm group-hover:translate-x-2 transition-transform inline-block">View Insights →</span>
              </div>
            </Link>

            {/* Admin Access Button */}
            <div className="group relative overflow-hidden rounded-2xl bg-slate-950 p-8 shadow-xl text-white block hover:-translate-y-2">
              <div className="relative z-10 space-y-3">
                <div className="text-4xl mb-4 bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Admin Access</h3>
                <p className="text-white/80 text-sm mb-4">
                  Securely add podcasts or moderate stories for SAHYOG.
                </p>
                <button
                  onClick={() => {
                    navigate('/admin');
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-white hover:border-white transition-colors"
                >
                  Open Gate →
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* Podcast Spotlight Section */}
        <section className="py-16 bg-gradient-to-br from-slate-950 via-rose-950 to-primary-950 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-center">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_55px_rgba(15,23,42,0.65)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-rose-600/20 opacity-70" />
                <div className="relative z-10 space-y-4">
                  <div className="text-xs uppercase tracking-[0.4em] text-white/70">Podcast Spotlight</div>
                  <h3 className="text-4xl font-black">Voices of Change</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Your weekly dose of hope, healing, and real talk about HIV/AIDS. Expert voices, survivor journeys, and community wisdom—all in one place. More powerful conversations coming soon!
                  </p>
                  <div className="flex flex-wrap gap-5 text-sm text-white/80">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎧</span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Listening Mood</p>
                        <p className="font-bold">Intimate conversations + research-backed clarity</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📅</span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Launch Status</p>
                        <p className="font-bold">Pre-Launch · More Coming Soon</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/podcasts"
                      className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transition-transform"
                    >
                      🎧 Start Listening
                    </Link>
                    <Link
                      to="/podcasts"
                      className="border border-white/70 px-6 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-all"
                    >
                      Explore Content
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-white/80">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                      <p className="text-3xl font-black text-white">🚀</p>
                      <p className="uppercase tracking-[0.3em]">Launching Soon</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                      <p className="text-3xl font-black text-white">∞</p>
                      <p className="uppercase tracking-[0.3em]">Stories to Tell</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {podcastHighlights.map((highlight, idx) => (
                  <motion.div
                    key={`${highlight.title}-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`rounded-3xl border border-white/10 p-5 shadow-[0_6px_20px_rgba(15,23,42,0.65)] ${
                      highlight.isComingSoon 
                        ? 'bg-white/[0.02] backdrop-blur-sm' 
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      {highlight.isComingSoon ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">🔜</span>
                          <p className="text-sm uppercase tracking-[0.3em] text-white/50 font-bold">Coming Soon</p>
                        </div>
                      ) : (
                        <p className="text-sm uppercase tracking-[0.3em] text-white/70">Featured</p>
                      )}
                      <span className={`text-xs ${
                        highlight.isComingSoon ? 'text-white/40' : 'text-white/60'
                      }`}>{highlight.duration}</span>
                    </div>
                    <h4 className={`text-xl font-bold mb-2 ${
                      highlight.isComingSoon ? 'text-white/60' : 'text-white'
                    }`}>{highlight.title}</h4>
                    <p className={`text-sm mb-4 ${
                      highlight.isComingSoon ? 'text-white/40' : 'text-white/70'
                    }`}>{highlight.guest}</p>
                    <p className={`text-sm leading-relaxed mb-4 ${
                      highlight.isComingSoon ? 'text-white/50 italic' : 'text-white/80'
                    }`}>{highlight.detail}</p>
                    {!highlight.isComingSoon && (
                      <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-rose-500 rounded-full" style={{ width: '80%' }} />
                      </div>
                    )}
                    {highlight.isComingSoon && (
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-white/20 to-white/40 rounded-full"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          style={{ width: '50%' }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Quick Facts Section */}
        <section id="learn" className="container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-bold tracking-wider text-sm uppercase">Quick Facts</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-850 mt-2">Everything You Need to Know</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Essential HIV/AIDS information for everyone</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  icon: '🛡️', 
                  title: 'How to prevent HIV',
                  desc: 'PrEP, condoms, safe practices',
                  link: '/info/prevention',
                  color: 'from-green-500 to-emerald-600',
                  bgColor: 'bg-green-50',
                  textColor: 'text-green-700'
                },
                { 
                  icon: '🔬', 
                  title: 'How HIV spreads',
                  desc: 'Transmission facts & myths',
                  link: '/info/transmission',
                  color: 'from-blue-500 to-cyan-600',
                  bgColor: 'bg-blue-50',
                  textColor: 'text-blue-700'
                },
                { 
                  icon: '🧪', 
                  title: 'HIV testing explained',
                  desc: 'Types, window period, where to test',
                  link: '/info/testing',
                  color: 'from-purple-500 to-violet-600',
                  bgColor: 'bg-purple-50',
                  textColor: 'text-purple-700'
                },
                { 
                  icon: '💊', 
                  title: 'Treatment works',
                  desc: 'Living healthy with HIV',
                  link: '/info/treatment',
                  color: 'from-rose-500 to-pink-600',
                  bgColor: 'bg-rose-50',
                  textColor: 'text-rose-700'
                },
                { 
                  icon: '🤗', 
                  title: 'Where to get help',
                  desc: 'Free helplines, ART centers, support',
                  link: '/info/help',
                  color: 'from-amber-500 to-orange-600',
                  bgColor: 'bg-amber-50',
                  textColor: 'text-amber-700'
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <Link
                    to={item.link}
                    className="block rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 h-full"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-md`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-850 mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${item.textColor} group-hover:translate-x-1 transition-transform`}>
                        Learn More
                      </span>
                      <span className={`${item.textColor}`}>→</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-3xl bg-gradient-to-r from-primary-600 to-rose-600 p-8 md:p-12 text-white text-center"
            >
              <h3 className="text-2xl md:text-3xl font-black mb-4">Need Help Right Now?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">Call the National AIDS Helpline 24/7 for free, confidential support</p>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <a 
                  href="tel:1097" 
                  className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-primary-50 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <span className="text-2xl">📞</span>
                  <span>Call 1097</span>
                </a>
                <Link
                  to="/info/help"
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all inline-flex items-center gap-2"
                >
                  <span>Find Support Centers</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Myth vs Fact */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-50 py-24" id="quiz">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
                  <span className="text-xl">🧠</span>
                  <span>Interactive Quiz</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-850 mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-primary-700">
                  {t('homepage.myth.title')}
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                  {t('homepage.myth.subtitle')}
                </p>
              </motion.div>

              <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
                {/* Main Quiz Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    key={currentLesson?.statement ?? 'empty'}
                    initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="relative rounded-3xl bg-white p-8 md:p-10 shadow-2xl border-2 border-primary-100 hover:shadow-3xl transition-all duration-500"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-500/20 to-transparent rounded-tr-full" />
                    
                    {/* Statement Counter */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-rose-100 text-primary-700 px-4 py-2 rounded-full text-sm font-bold">
                        <span className="text-lg">💡</span>
                        Statement {lessonIndex + 1} of {mythStatements.length}
                      </span>
                      <motion.button
                        onClick={nextStatement}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                        title="Next statement"
                      >
                        🔄
                      </motion.button>
                    </div>

                    {/* Statement Text */}
                    <div className="relative bg-gradient-to-br from-slate-50 to-primary-50/50 rounded-2xl p-8 mb-8 border border-slate-100">
                      <div className="absolute top-4 left-4 text-6xl text-primary-200 font-serif">"</div>
                      <p className="relative text-2xl md:text-3xl font-bold text-slate-850 leading-relaxed text-center pt-6">
                        {currentLesson?.statement}
                      </p>
                      <div className="absolute bottom-4 right-4 text-6xl text-primary-200 font-serif transform rotate-180">"</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <motion.button
                        onClick={nextStatement}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 py-6 px-6 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
                        <div className="relative flex flex-col items-center gap-2">
                          <span className="text-3xl">✅</span>
                          <span>FACT</span>
                        </div>
                      </motion.button>
                      
                      <motion.button
                        onClick={nextStatement}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 py-6 px-6 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
                        <div className="relative flex flex-col items-center gap-2">
                          <span className="text-3xl">❌</span>
                          <span>MYTH</span>
                        </div>
                      </motion.button>
                    </div>

                    {/* Explanation Panel */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 text-white shadow-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-2xl">
                          💬
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-3 text-primary-300">Explanation:</h4>
                          <p className="text-slate-200 leading-relaxed text-base">
                            {currentLesson?.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Sidebar Info Cards */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-white shadow-2xl overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative">
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-2xl font-bold mb-4">Why this matters?</h3>
                      <p className="text-primary-100 leading-relaxed">
                        {t('homepage.myth.forPublic')}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="rounded-3xl bg-white p-8 border-2 border-slate-100 shadow-lg"
                  >
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="text-xl font-bold text-slate-850 mb-3">Ready for More?</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      Test your knowledge with our interactive games and unlock achievements!
                    </p>
                    <Link
                      to="/games"
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg"
                    >
                      <span>Play Games</span>
                      <span>→</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="rounded-3xl bg-gradient-to-br from-rose-100 to-primary-100 p-8 border border-primary-200"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">📚</div>
                      <div className="text-4xl font-black text-slate-850 mb-2">{mythStatements.length}</div>
                      <p className="text-slate-700 font-medium">Facts to Explore</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Games Showcase Section */}
        <section id="games" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-bold tracking-wider text-sm uppercase">Gamified Learning</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-850 mt-2">Learn Through Play</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: '❓', title: 'Myth or Fact?', desc: 'Test your HIV knowledge', difficulty: 'Easy', color: 'bg-green-100 text-green-700' },
                { icon: '🎯', title: 'Prevention Steps', desc: 'Arrange prevention strategies', difficulty: 'Medium', color: 'bg-gold-100 text-gold-700' },
                { icon: '🛡️', title: 'Safe Choices', desc: 'Make smart decisions', difficulty: 'Medium', color: 'bg-slate-100 text-slate-700' },
                { icon: '🏆', title: 'Knowledge Quest', desc: 'Ultimate quiz challenge', difficulty: 'Hard', color: 'bg-primary-100 text-primary-700' },
              ].map((game, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ translateY: -8 }}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="text-5xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">{game.icon}</div>
                  <h3 className="text-lg font-bold text-slate-850 mb-2">{game.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{game.desc}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${game.color}`}>
                    {game.difficulty}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="/games">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                >
                  Explore All Games →
                </motion.button>
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="text-primary-400 font-bold tracking-wider text-sm uppercase">{t('homepage.keralaStats.title')}</span>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {keralaData.map((entry, idx) => (
                    <motion.div 
                      key={entry.labelKey} 
                      className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700"
                    >
                      <motion.p 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: idx * 0.1 }}
                        className="text-3xl font-black text-primary-400 mb-2"
                      >
                        {entry.value}
                      </motion.p>
                      <p className="text-xs text-slate-400">{t(`homepage.${entry.labelKey}`)}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="text-primary-400 font-bold tracking-wider text-sm uppercase">{t('homepage.patientStats.title')}</span>
                <div className="mt-8 space-y-4">
                  {patientData.map((entry) => (
                    <motion.div 
                      key={entry.labelKey} 
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700"
                    >
                      <p className="text-sm text-slate-300">{t(`homepage.${entry.labelKey}`)}</p>
                      <span className="text-xl font-bold text-white">{entry.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t border-slate-100 py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <RedRibbon size="sm" />
                <span className="font-bold text-slate-850">HIV Awareness Platform</span>
              </div>
              <div className="text-sm text-slate-500">
                {t('homepage.footer.languageLabel')} {t('languageSelection.title')}
              </div>
              <div className="text-sm text-slate-500">
                {t('homepage.footer.accessibility')}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
