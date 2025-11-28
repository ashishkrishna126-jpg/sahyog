import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Language } from '../types';
import { motion } from 'framer-motion';
import RedRibbon from '../components/common/RedRibbon';

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

export default function LanguageLanding() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { setLanguage, setHasCompletedIntro } = useAppStore();

  const handleLanguageSelect = (languageCode: Language) => {
    setLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    setHasCompletedIntro(true);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white overflow-hidden relative font-sans text-slate-850">
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50" />
        
        {/* Primary animated blob */}
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/60 rounded-full blur-3xl opacity-60"
        />

        {/* Secondary animated blob */}
        <motion.div
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-100/60 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <RedRibbon size="lg" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Welcome to <span className="text-primary-600">SAHYOG</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Please select your preferred language to continue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ scale: 1.02, translateY: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect(lang.code)}
              className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-2xl font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {lang.nativeName}
                  </span>
                  <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                    {lang.name}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                  <span className="text-slate-400 group-hover:text-primary-600 transition-colors">→</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12 text-slate-400 text-sm"
        >
          Together with Hope • Voices of Hope in HIV
        </motion.p>
      </div>
    </div>
  );
}
