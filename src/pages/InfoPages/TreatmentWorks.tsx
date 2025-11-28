import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import RedRibbon from '../../components/common/RedRibbon';

const medications = [
  {
    name: 'NRTIs',
    fullName: 'Nucleoside Reverse Transcriptase Inhibitors',
    icon: '💊',
    howItWorks: 'Blocks HIV from copying itself',
    examples: ['Tenofovir', 'Emtricitabine', 'Lamivudine'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'NNRTIs',
    fullName: 'Non-Nucleoside Reverse Transcriptase Inhibitors',
    icon: '🔒',
    howItWorks: 'Stops HIV from multiplying',
    examples: ['Efavirenz', 'Rilpivirine', 'Doravirine'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Protease Inhibitors',
    fullName: 'Protease Inhibitors (PIs)',
    icon: '🛡️',
    howItWorks: 'Prevents HIV from making new copies',
    examples: ['Darunavir', 'Atazanavir'],
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Integrase Inhibitors',
    fullName: 'Integrase Strand Transfer Inhibitors',
    icon: '🎯',
    howItWorks: 'Stops HIV from integrating into cells',
    examples: ['Dolutegravir', 'Raltegravir', 'Bictegravir'],
    color: 'from-rose-500 to-rose-600'
  }
];

const treatmentBenefits = [
  {
    icon: '📈',
    title: 'Live a Normal Lifespan',
    description: 'With treatment, life expectancy is nearly the same as someone without HIV'
  },
  {
    icon: '💪',
    title: 'Stay Healthy',
    description: 'Maintains strong immune system and prevents AIDS-related illnesses'
  },
  {
    icon: '🔬',
    title: 'Undetectable = Untransmittable',
    description: 'Cannot transmit HIV to sexual partners when viral load is undetectable'
  },
  {
    icon: '👶',
    title: 'Have Healthy Children',
    description: 'Can have children without passing HIV to baby or partner'
  },
  {
    icon: '💼',
    title: 'Work & Travel Freely',
    description: 'Live your life without limitations'
  },
  {
    icon: '🎯',
    title: 'One Pill a Day',
    description: 'Modern treatments are simple - often just one pill daily'
  }
];

export default function TreatmentWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              Treatment Guide
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/home" className="text-sm font-bold text-slate-600 hover:text-primary-600">Home</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block p-4 bg-emerald-100 rounded-2xl mb-6">
              <span className="text-6xl">💊</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Treatment <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Works</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              HIV treatment has transformed from a death sentence to a manageable chronic condition. Here's everything you need to know.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold">
              <span>✓</span> 95%+ of people on treatment achieve undetectable viral load
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Magic of ART */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-center">
              What is ART (Antiretroviral Therapy)?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">How It Works</h3>
                <p className="text-blue-100 leading-relaxed mb-4">
                  ART is a combination of HIV medicines (usually 2-3 drugs) taken every day. These drugs:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300">•</span>
                    <span className="text-blue-100">Stop HIV from multiplying</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300">•</span>
                    <span className="text-blue-100">Reduce viral load to undetectable levels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300">•</span>
                    <span className="text-blue-100">Allow CD4 cells (immune cells) to recover</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">The Results</h3>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <p className="font-bold mb-1">Within 6 months:</p>
                    <p className="text-sm text-blue-100">Most people reach undetectable viral load</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <p className="font-bold mb-1">Long-term:</p>
                    <p className="text-sm text-blue-100">Live as long as someone without HIV</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <p className="font-bold mb-1">U=U Effect:</p>
                    <p className="text-sm text-blue-100">Cannot transmit HIV sexually</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medication Types */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Types of HIV Medications
            </h2>
            <p className="text-lg text-slate-600">Different drugs attack HIV in different ways</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {medications.map((med, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${med.color} flex items-center justify-center text-3xl mb-4`}>
                  {med.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{med.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{med.fullName}</p>
                <div className="bg-slate-50 p-4 rounded-xl mb-4">
                  <p className="text-sm font-bold text-slate-700 mb-1">How it works:</p>
                  <p className="text-slate-600">{med.howItWorks}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-2">Common drugs:</p>
                  <div className="flex flex-wrap gap-2">
                    {med.examples.map((drug) => (
                      <span key={drug} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {drug}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Life-Changing Benefits of Treatment
            </h2>
            <p className="text-lg text-slate-600">Why starting treatment early matters</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {treatmentBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md text-center"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Side Effects */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              What About Side Effects?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Good News
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Modern drugs have minimal side effects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Most people tolerate them very well</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">If you have side effects, other options exist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Early side effects usually go away in weeks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Possible Side Effects
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-slate-700">Nausea (usually temporary)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-slate-700">Fatigue in first few weeks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-slate-700">Headaches (rare, manageable)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-slate-700">Talk to your doctor - solutions available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adherence Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              The #1 Rule: Take Your Meds Every Day
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Consistency is key to treatment success. Missing doses can lead to drug resistance.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">⏰</div>
                <h3 className="font-bold text-slate-900 mb-2">Set Alarms</h3>
                <p className="text-sm text-slate-600">Take pills at the same time daily</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">📦</div>
                <h3 className="font-bold text-slate-900 mb-2">Pill Organizers</h3>
                <p className="text-sm text-slate-600">Never miss a dose</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-bold text-slate-900 mb-2">Apps</h3>
                <p className="text-sm text-slate-600">Track adherence digitally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Treatment Saves Lives</h2>
          <p className="text-xl mb-8 text-slate-300">Start early, stay consistent, live fully.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/info/testing" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg">
              ← Get Tested First
            </Link>
            <Link to="/info/help" className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-all">
              Find Support & Resources →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
