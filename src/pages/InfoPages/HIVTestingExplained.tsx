import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import RedRibbon from '../../components/common/RedRibbon';

const testTypes = [
  {
    icon: '💉',
    title: 'Blood Test',
    time: 'Results in 1-3 days',
    accuracy: '99.9%',
    description: 'Most accurate. Detects HIV antibodies and antigens.',
    window: '18-45 days after exposure'
  },
  {
    icon: '🩸',
    title: 'Rapid Test',
    time: 'Results in 20 minutes',
    accuracy: '99%',
    description: 'Finger prick or oral swab. Quick results.',
    window: '23-90 days after exposure'
  },
  {
    icon: '🏠',
    title: 'Home Test Kit',
    time: 'Results in 20 minutes',
    accuracy: '92-99%',
    description: 'Private testing at home. FDA approved.',
    window: '23-90 days after exposure'
  }
];

const timeline = [
  { time: '0-72 hours', action: 'PEP Window', description: 'Start emergency PEP if exposed', color: 'bg-red-500' },
  { time: '10-33 days', action: 'Window Period Starts', description: 'HIV may not show on tests yet', color: 'bg-orange-500' },
  { time: '18-45 days', action: 'Early Detection', description: '4th gen test can detect HIV', color: 'bg-yellow-500' },
  { time: '3 months', action: 'Conclusive Result', description: 'Antibody tests are conclusive', color: 'bg-green-500' }
];

export default function HIVTestingExplained() {
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is HIV testing painful?',
      a: 'Most tests are quick and painless. A finger prick feels like a quick pinch, and oral swabs are completely painless.'
    },
    {
      q: 'Will anyone know I got tested?',
      a: 'Testing is confidential. You can also get anonymous testing where you don\'t provide your name.'
    },
    {
      q: 'What if I test positive?',
      a: 'You will be connected to counseling and medical care immediately. With treatment, people with HIV live long, healthy lives.'
    },
    {
      q: 'How often should I get tested?',
      a: 'CDC recommends at least once for everyone. If sexually active with multiple partners, test every 3-6 months.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              Testing Guide
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/home" className="text-sm font-bold text-slate-600 hover:text-primary-600">Home</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block p-4 bg-teal-100 rounded-2xl mb-6">
              <span className="text-6xl">🩺</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              HIV Testing <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Explained</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Getting tested is quick, easy, and the best way to know your status. Early detection saves lives.
            </p>
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-6 py-3 rounded-full font-bold">
              <span>🎯</span> Knowing is power. Testing is caring.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Test Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Types of HIV Tests
            </h2>
            <p className="text-lg text-slate-600">Choose what works best for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testTypes.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100 hover:border-teal-300 transition-all"
              >
                <div className="text-6xl mb-6 text-center">{test.icon}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 text-center">{test.title}</h3>
                <div className="space-y-3 mb-6">
                  <div className="bg-teal-50 p-3 rounded-xl text-center">
                    <p className="text-teal-700 font-bold">{test.time}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl text-center">
                    <p className="text-green-700 font-bold">{test.accuracy} Accurate</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4 text-center leading-relaxed">{test.description}</p>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-xs text-slate-500 font-medium">Detection Window:</p>
                  <p className="text-sm font-bold text-slate-700">{test.window}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Understanding the Window Period
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The "window period" is the time between HIV exposure and when a test can detect it.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full ${item.color}`} />
                  {idx < timeline.length - 1 && <div className="w-1 h-full bg-slate-200 mt-2" />}
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-slate-500">{item.time}</span>
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${item.color}`}>
                      {item.action}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              What to Expect During Testing
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📋</span> Before the Test
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">No special preparation needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">You may receive pre-test counseling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Testing is quick (5-20 minutes)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span> After the Test
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Negative: You're HIV-negative (retest periodically)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Positive: Immediate support and treatment available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Post-test counseling provided</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              Common Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setShowFAQ(showFAQ === idx ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                    <span className="text-2xl text-slate-400">{showFAQ === idx ? '−' : '+'}</span>
                  </button>
                  {showFAQ === idx && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Get Tested?</h2>
          <p className="text-xl mb-8 text-teal-100">Find a testing center near you or order a home test kit.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/home" className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold hover:bg-teal-50 transition-all shadow-lg">
              Back to Home
            </Link>
            <Link to="/info/treatment" className="bg-teal-800 text-white px-8 py-4 rounded-full font-bold hover:bg-teal-900 transition-all">
              Learn About Treatment →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
