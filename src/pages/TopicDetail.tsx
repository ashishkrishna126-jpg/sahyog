import { useTranslation } from 'react-i18next';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';

const topicContent: Record<string, {
  icon: string;
  color: string;
  content: string[];
}> = {
  whatIsHiv: {
    icon: '📚',
    color: 'from-primary-500 to-primary-600',
    content: [
      'HIV (Human Immunodeficiency Virus) is a virus that attacks the body\'s immune system.',
      'AIDS (Acquired Immunodeficiency Syndrome) is the final stage of HIV infection.',
      'With proper treatment, people with HIV can live long, healthy lives.',
      'HIV weakens the immune system by destroying CD4 cells (T cells).',
      'Early detection and treatment are crucial for managing HIV.',
    ],
  },
  howItSpreads: {
    icon: '⚠️',
    color: 'from-primary-400 to-primary-500',
    content: [
      'HIV spreads through unprotected sexual contact with an infected person.',
      'Sharing needles or syringes with someone who has HIV.',
      'From mother to child during pregnancy, childbirth, or breastfeeding.',
      'Through blood transfusions (very rare in countries with proper screening).',
      'Occupational exposure in healthcare settings (extremely rare).',
    ],
  },
  howItDoesNot: {
    icon: '✅',
    color: 'from-green-500 to-green-600',
    content: [
      'HIV does NOT spread through casual contact like hugging or shaking hands.',
      'You cannot get HIV from sharing food, utensils, or drinking glasses.',
      'HIV is NOT transmitted through toilet seats, swimming pools, or mosquito bites.',
      'Kissing, coughing, or sneezing does NOT spread HIV.',
      'Living or working with someone who has HIV poses no risk through normal contact.',
    ],
  },
  testing: {
    icon: '🔍',
    color: 'from-primary-300 to-primary-400',
    content: [
      'HIV testing is simple, quick, and confidential.',
      'Early testing allows for early treatment, which is highly effective.',
      'You can get tested at clinics, hospitals, or community health centers.',
      'Self-testing kits are also available in many regions.',
      'It is recommended to get tested at least once a year if you are sexually active.',
    ],
  },
  prevention: {
    icon: '🛡️',
    color: 'from-gold-500 to-gold-600',
    content: [
      'Use condoms correctly every time you have sex.',
      'PrEP (Pre-Exposure Prophylaxis) is a daily medicine that prevents HIV.',
      'PEP (Post-Exposure Prophylaxis) can prevent HIV if taken within 72 hours of exposure.',
      'Never share needles or drug injection equipment.',
      'Get tested and treated for other STDs, as they can increase HIV risk.',
    ],
  },
  treatment: {
    icon: '💊',
    color: 'from-slate-500 to-slate-600',
    content: [
      'Antiretroviral therapy (ART) involves taking medicines daily to treat HIV.',
      'ART reduces the viral load to undetectable levels (U=U).',
      'Undetectable means Untransmittable – you cannot pass HIV to partners.',
      'Treatment helps maintain a healthy immune system.',
      'Adherence to medication is key to successful treatment.',
    ],
  },
  stigma: {
    icon: '🤝',
    color: 'from-ribbon-500 to-ribbon-600',
    content: [
      'Stigma and discrimination can prevent people from getting tested and treated.',
      'Educating yourself and others helps break the stigma.',
      'Show support and empathy to those living with HIV.',
      'Language matters – use people-first language (e.g., "person living with HIV").',
      'Everyone deserves respect, dignity, and access to healthcare.',
    ],
  },
};

export default function TopicDetail() {
  const { t } = useTranslation();
  const { topicId } = useParams();
  const topic = topicId ? topicContent[topicId] : null;

  if (!topic) {
    return <Navigate to="/awareness" replace />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-850">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/awareness" className="group flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 group-hover:bg-primary-50 transition-colors">
              <RedRibbon size="sm" />
              <span className="font-bold text-slate-850 group-hover:text-primary-600 transition-colors">{t('awareness.title')}</span>
            </div>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main>
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

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-8xl mb-6 inline-block filter drop-shadow-lg"
              >
                {topic.icon}
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-850 mb-6 break-words leading-tight">
                {t(`awareness.topics.${topicId}.title`)}
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-850/70 max-w-2xl mx-auto leading-relaxed">
                {t(`awareness.topics.${topicId}.description`)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Cards */}
        <section className="container mx-auto px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {topic.content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center flex-shrink-0 text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      {index + 1}
                    </div>
                    <p className="text-lg text-slate-700 leading-relaxed pt-1">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: topic.content.length * 0.1 + 0.2 }}
              className="mt-16 text-center"
            >
              <Link to="/awareness">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-8 py-4 text-slate-900 font-bold hover:bg-slate-200 transition-colors"
                >
                  <span>←</span>
                  <span>Back to Awareness Hub</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
