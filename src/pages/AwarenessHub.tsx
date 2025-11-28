import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';

interface AwarenessTopic {
  id: string;
  icon: string;
  color: string;
}

export default function AwarenessHub() {
  const { t } = useTranslation();

  const topics: AwarenessTopic[] = [
    { id: 'whatIsHiv', icon: '📚', color: 'from-primary-500 to-primary-600' },
    { id: 'howItSpreads', icon: '⚠️', color: 'from-primary-400 to-primary-500' },
    { id: 'howItDoesNot', icon: '✅', color: 'from-green-500 to-green-600' },
    { id: 'testing', icon: '🔍', color: 'from-primary-300 to-primary-400' },
    { id: 'stigma', icon: '❤️', color: 'from-primary-600 to-primary-700' },
    { id: 'mythVsFact', icon: '🎯', color: 'from-primary-200 to-primary-300' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-850">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              {t('awareness.title')}
            </span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white -z-10" />
        
        {/* Animated Background Blob */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-850 mb-6 break-words leading-tight">
              {t('awareness.knowledgeIsPower', 'Knowledge is Power')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-850/70 max-w-2xl mx-auto leading-relaxed">
              {t('awareness.subtitle', 'Understanding HIV/AIDS is the first step in fighting stigma and supporting those affected.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Link key={topic.id} to={`/awareness/${topic.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ translateY: -8 }}
                className="h-full bg-white rounded-2xl p-8 shadow-lg shadow-primary-900/5 border border-primary-50 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/10 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-3xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {topic.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-850 mb-3 group-hover:text-primary-600 transition-colors">
                  {t(`awareness.topics.${topic.id}.title`)}
                </h3>
                <p className="text-slate-850/70 leading-relaxed">
                  {t(`awareness.topics.${topic.id}.description`)}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Banner */}
      <section className="container mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="rounded-3xl bg-slate-850 text-white p-12 text-center shadow-2xl shadow-slate-900/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.2em] text-primary-400 font-bold mb-4">Simple & Accessible</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Learn at Your Own Pace
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Each topic breaks down complex information into simple, digestible facts. No medical background needed. Just honest, clear guidance to understand HIV better and support those affected.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
