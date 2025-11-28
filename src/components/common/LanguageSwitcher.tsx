import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { Language } from '../../types';
import { motion } from 'framer-motion';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useAppStore();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 rounded-full bg-[#00857a] px-5 py-2 text-white shadow-lg transition hover:bg-[#00a597]">
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="font-medium">{currentLanguage?.name}</span>
        <span className="text-sm">▼</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#111] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
              language === lang.code ? 'bg-[#00857a] text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
