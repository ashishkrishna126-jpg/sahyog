import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import RedRibbon from '../../components/common/RedRibbon';

const preventionMethods = [
  {
    icon: '💊',
    title: 'PrEP (Pre-Exposure Prophylaxis)',
    description: 'A daily pill that can reduce HIV risk by up to 99% when taken consistently.',
    color: 'from-blue-500 to-blue-600',
    stats: '99% effective'
  },
  {
    icon: '🛡️',
    title: 'Use Condoms',
    description: 'Proper and consistent condom use is highly effective in preventing HIV transmission.',
    color: 'from-green-500 to-green-600',
    stats: '95% effective'
  },
  {
    icon: '💉',
    title: 'Clean Needles',
    description: 'Never share needles, syringes, or drug injection equipment.',
    color: 'from-purple-500 to-purple-600',
    stats: '100% prevention'
  },
  {
    icon: '🩺',
    title: 'Regular Testing',
    description: 'Know your status and your partner\'s status. Get tested every 3-6 months if sexually active.',
    color: 'from-rose-500 to-rose-600',
    stats: 'Early detection saves lives'
  },
  {
    icon: '🤰',
    title: 'PMTCT Programs',
    description: 'Prevention of Mother-to-Child Transmission during pregnancy and childbirth.',
    color: 'from-pink-500 to-pink-600',
    stats: '98% reduction'
  },
  {
    icon: '🩹',
    title: 'PEP (Post-Exposure)',
    description: 'Emergency medication within 72 hours of potential exposure.',
    color: 'from-orange-500 to-orange-600',
    stats: '72-hour window'
  }
];

const mythBusters = [
  { myth: 'Mosquitoes can spread HIV', fact: 'FALSE - HIV cannot survive in mosquitoes', icon: '🦟' },
  { myth: 'You can get HIV from toilet seats', fact: 'FALSE - HIV dies quickly outside the body', icon: '🚽' },
  { myth: 'HIV only affects certain groups', fact: 'FALSE - Anyone can get HIV', icon: '👥' },
  { myth: 'You can tell if someone has HIV by looking', fact: 'FALSE - No visible symptoms for years', icon: '👀' }
];

export default function HowToPreventHIV() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              Prevention Guide
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/home" className="text-sm font-bold text-slate-600 hover:text-primary-600">Home</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block p-4 bg-blue-100 rounded-2xl mb-6">
              <span className="text-6xl">🛡️</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Prevent HIV</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Knowledge is your best defense. Learn the proven methods that can keep you safe.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold">
              <span>✓</span> 100% Preventable with the right precautions
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prevention Methods Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              6 Powerful Ways to Protect Yourself
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each method is scientifically proven and highly effective when used correctly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {preventionMethods.map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{method.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{method.description}</p>
                <div className="inline-block bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold">
                  {method.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed PrEP Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                  💊
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-3">Deep Dive: PrEP</h2>
                  <p className="text-lg text-slate-600">The game-changer in HIV prevention</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="text-green-500">✓</span> What is PrEP?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    PrEP stands for Pre-Exposure Prophylaxis. It's a daily pill (Truvada or Descovy) that prevents HIV from establishing infection in your body.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="text-slate-600">Take one pill daily at the same time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="text-slate-600">Reaches maximum protection after 7 days for receptive anal sex</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="text-slate-600">After 21 days for receptive vaginal sex and injection drug use</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="text-orange-500">!</span> Important Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <p className="font-bold text-green-800 mb-1">99% Effective</p>
                      <p className="text-green-700 text-sm">When taken daily as prescribed</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <p className="font-bold text-blue-800 mb-1">No Side Effects for Most</p>
                      <p className="text-blue-700 text-sm">Some may experience mild nausea initially</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <p className="font-bold text-purple-800 mb-1">Regular Check-ups</p>
                      <p className="text-purple-700 text-sm">HIV test every 3 months, kidney function monitored</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Myth Busters */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              🚫 Myth Busters
            </h2>
            <p className="text-lg text-slate-600">Let's clear up common misconceptions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mythBusters.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-100"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-red-600 font-bold mb-2 line-through">{item.myth}</p>
                    <p className="text-green-700 font-bold text-lg">{item.fact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Take Control?</h2>
          <p className="text-xl mb-8 text-blue-100">Talk to a healthcare provider about PrEP and other prevention methods.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/home" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg">
              Back to Home
            </Link>
            <Link to="/info/how-hiv-spreads" className="bg-blue-800 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition-all">
              Learn How HIV Spreads →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
