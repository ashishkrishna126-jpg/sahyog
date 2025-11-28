import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';

type MythStatement = {
  statement: string;
  detail: string;
  answer: boolean;
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

const podcastHighlights = [
  {
    title: 'Episode 12 · Living with PrEP',
    guest: 'Dr. Priya Menon · HIV Specialist',
    detail: 'Understand how PrEP pairs with testing and counseling in urban and rural settings.',
    duration: '28 min',
  },
  {
    title: 'Episode 13 · Voices of Healing',
    guest: 'Survivor circles from Kochi',
    detail: 'Community members share how they built resilience through support groups.',
    duration: '32 min',
  },
  {
    title: 'Episode 14 · Breaking the Stigma',
    guest: 'Counselor Samir Rao',
    detail: 'Practical tips for allies and friends to communicate with care.',
    duration: '25 min',
  },
];

const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'sahyog-admin';

export default function Homepage() {
  const { t } = useTranslation();
  const [lessonIndex, setLessonIndex] = useState(0);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const mythStatements = useMemo(() => {
    return t('homepage.mythStatements', { returnObjects: true }) as MythStatement[];
  }, [t]);

  const currentLesson = mythStatements[lessonIndex] ?? mythStatements[0];

  const nextStatement = () => {
    if (mythStatements.length === 0) return;
    setLessonIndex((prev) => (prev + 1) % mythStatements.length);
  };

  const handleAdminSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passcodeInput.trim() === ADMIN_PASSCODE) {
      setIsAdminModalOpen(false);
      setPasscodeInput('');
      setAuthError(null);
      navigate('/admin');
    } else {
      setAuthError('Incorrect passcode.');
    }
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
                  Join our weekly podcast featuring real stories, medical experts, and community voices breaking the silence on HIV.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/podcasts"
                    className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-colors inline-block flex items-center gap-2"
                  >
                    <span>▶</span> Listen Now
                  </Link>
                  <Link
                    to="/stories"
                    className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-100 rounded-full font-bold hover:border-primary-200 hover:bg-primary-50 transition-colors inline-block"
                  >
                    Read Stories
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
                    setIsAdminModalOpen(true);
                    setAuthError(null);
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
                    Each week we host experts, survivors, and allies to share relatable stories, actionable tips, and practical care guidance. Dive deeper into how HIV/AIDS affects communities and how supportive spaces can lead to healing.
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
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">New Episode</p>
                        <p className="font-bold">Every Friday · 7 PM IST</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/podcasts"
                      className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transition-transform"
                    >
                      Listen Now
                    </Link>
                    <Link
                      to="/podcasts"
                      className="border border-white/70 px-6 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-all"
                    >
                      View Episodes
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-white/80">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                      <p className="text-3xl font-black text-white">168K</p>
                      <p className="uppercase tracking-[0.3em]">Listens</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                      <p className="text-3xl font-black text-white">6</p>
                      <p className="uppercase tracking-[0.3em]">Seasons</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {podcastHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_6px_20px_rgba(15,23,42,0.65)]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm uppercase tracking-[0.3em] text-white/70">Featured</p>
                      <span className="text-xs text-white/60">{highlight.duration}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{highlight.title}</h4>
                    <p className="text-white/70 text-sm mb-4">{highlight.guest}</p>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">{highlight.detail}</p>
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-rose-500 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
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
        <section className="bg-slate-50 py-24" id="quiz">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="text-primary-600 font-bold tracking-wider text-sm uppercase">Interactive Quiz</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-850 mt-2 mb-4">{t('homepage.myth.title')}</h2>
                <p className="text-slate-600 mb-8 text-lg">{t('homepage.myth.subtitle')}</p>
                
                <motion.div
                  key={currentLesson?.statement ?? 'empty'}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100"
                >
                  <p className="text-2xl font-bold text-slate-850 leading-relaxed mb-8">"{currentLesson?.statement}"</p>
                  <div className="flex gap-4 mb-8">
                    <motion.button
                      onClick={nextStatement}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 rounded-xl bg-green-50 border-2 border-green-100 py-4 text-green-700 font-bold hover:bg-green-100 hover:border-green-200 transition-colors"
                    >
                      Fact
                    </motion.button>
                    <motion.button
                      onClick={nextStatement}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 rounded-xl bg-red-50 border-2 border-red-100 py-4 text-red-700 font-bold hover:bg-red-100 hover:border-red-200 transition-colors"
                    >
                      Myth
                    </motion.button>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-50 rounded-xl p-6"
                  >
                    <p className="text-slate-700 leading-relaxed">
                      <span className="font-bold block mb-2">Explanation:</span>
                      {currentLesson?.detail}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="rounded-3xl bg-primary-600 p-8 text-white shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4">Why this matters?</h3>
                  <p className="text-primary-100 leading-relaxed">{t('homepage.myth.forPublic')}</p>
                </motion.div>
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

      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/70">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-black text-slate-900 mb-2">Admin Access</h3>
            <p className="text-sm text-slate-500 mb-6">
              Enter the administrator passcode to add podcasts or review stories.
            </p>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Passcode</label>
                <input
                  value={passcodeInput}
                  onChange={(event) => setPasscodeInput(event.target.value)}
                  type="password"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              {authError && <p className="text-sm text-rose-500">{authError}</p>}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminModalOpen(false);
                    setPasscodeInput('');
                    setAuthError(null);
                  }}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-primary-500"
                >
                  Submit
                </button>
              </div>
            </form>
            <p className="mt-4 text-xs text-slate-400">
              Tip: Set `VITE_ADMIN_PASSCODE` in your environment to avoid exposing the default value.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
