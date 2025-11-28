import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import RedRibbon from '../../components/common/RedRibbon';

const transmissionRoutes = [
  {
    icon: '💉',
    title: 'Blood',
    risk: 'HIGH',
    description: 'Sharing needles, syringes, or other injection equipment.',
    examples: ['Injection drug use', 'Unsterilized medical equipment', 'Blood transfusions (rare in screened blood)'],
    color: 'bg-red-500'
  },
  {
    icon: '❤️',
    title: 'Sexual Contact',
    risk: 'HIGH',
    description: 'Unprotected vaginal or anal sex with an HIV+ person.',
    examples: ['Anal sex (highest risk)', 'Vaginal sex', 'Oral sex (very low risk)'],
    color: 'bg-pink-500'
  },
  {
    icon: '🤰',
    title: 'Mother to Child',
    risk: 'PREVENTABLE',
    description: 'During pregnancy, childbirth, or breastfeeding.',
    examples: ['Without treatment: 25% risk', 'With treatment: <1% risk', 'PMTCT programs available'],
    color: 'bg-purple-500'
  }
];

const cannotSpread = [
  { icon: '🤝', text: 'Shaking hands or hugging' },
  { icon: '😘', text: 'Kissing (closed-mouth)' },
  { icon: '🚽', text: 'Toilet seats' },
  { icon: '🍽️', text: 'Sharing utensils or food' },
  { icon: '💦', text: 'Tears, saliva, or sweat' },
  { icon: '🦟', text: 'Mosquito or insect bites' },
  { icon: '🏊', text: 'Swimming pools' },
  { icon: '🚪', text: 'Casual contact' }
];

export default function HowHIVSpreads() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              Transmission Facts
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/home" className="text-sm font-bold text-slate-600 hover:text-primary-600">Home</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block p-4 bg-rose-100 rounded-2xl mb-6">
              <span className="text-6xl">🔬</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              How HIV <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">Spreads</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Understanding transmission helps you protect yourself and others. Knowledge dispels fear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transmission Routes */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              3 Main Routes of Transmission
            </h2>
            <p className="text-lg text-slate-600">HIV is transmitted through specific body fluids</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {transmissionRoutes.map((route, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100"
              >
                <div className="text-6xl mb-6 text-center">{route.icon}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 text-center">{route.title}</h3>
                <div className={`inline-block ${route.color} text-white px-4 py-2 rounded-full text-xs font-bold mb-6 w-full text-center`}>
                  {route.risk} RISK
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed text-center">{route.description}</p>
                <div className="space-y-2">
                  {route.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
                      <span className="text-slate-400">•</span>
                      <span className="text-sm text-slate-700">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Body Fluids Chart */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">
              Which Body Fluids Transmit HIV?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> CAN Transmit HIV
                </h4>
                <div className="space-y-3">
                  {['Blood', 'Semen & pre-seminal fluid', 'Vaginal fluids', 'Rectal fluids', 'Breast milk'].map((fluid) => (
                    <div key={fluid} className="bg-white p-3 rounded-xl flex items-center gap-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="font-medium text-slate-700">{fluid}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span> CANNOT Transmit HIV
                </h4>
                <div className="space-y-3">
                  {['Saliva', 'Tears', 'Sweat', 'Urine', 'Feces (unless blood present)'].map((fluid) => (
                    <div key={fluid} className="bg-white p-3 rounded-xl flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="font-medium text-slate-700">{fluid}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cannot Spread Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              ✅ You CANNOT Get HIV From
            </h2>
            <p className="text-lg text-slate-600">Breaking stigma with facts</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cannotSpread.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-sm font-bold text-slate-700">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg text-center">
            <p className="text-lg text-slate-700 leading-relaxed">
              <span className="font-black text-green-600">It's safe</span> to live, work, and socialize with people living with HIV. 
              Casual contact does not spread the virus. <span className="font-bold">Stigma hurts more than the virus.</span>
            </p>
          </div>
        </div>
      </section>

      {/* U=U Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <div className="inline-block bg-white/20 backdrop-blur px-6 py-3 rounded-full mb-6">
                <span className="text-2xl font-black">U = U</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Undetectable = Untransmittable
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                The most important scientific breakthrough in HIV prevention
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">What does it mean?</h3>
                <p className="text-blue-100 leading-relaxed">
                  When a person living with HIV takes their medication as prescribed and maintains an undetectable viral load, 
                  they <span className="font-bold text-white">cannot transmit HIV</span> to sexual partners.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">The Science</h3>
                <p className="text-blue-100 leading-relaxed">
                  Multiple large-scale studies with <span className="font-bold text-white">thousands of couples</span> over 
                  many years showed <span className="font-bold text-white">zero transmissions</span> when viral load was undetectable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Knowledge is Power</h2>
          <p className="text-xl mb-8 text-slate-300">Continue learning to protect yourself and fight stigma.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/info/prevention" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg">
              ← Learn Prevention Methods
            </Link>
            <Link to="/info/testing" className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-all">
              HIV Testing Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
