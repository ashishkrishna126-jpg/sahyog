import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import RedRibbon from '../../components/common/RedRibbon';

const helpResources = [
  {
    icon: '🏥',
    title: 'ART Centers',
    description: 'Free HIV treatment and care at government ART centers across India',
    services: ['Free medicines', 'Regular check-ups', 'CD4 & viral load tests', 'Counseling'],
    color: 'from-blue-500 to-blue-600',
    phone: '1097 (National AIDS Helpline)'
  },
  {
    icon: '📞',
    title: '24/7 Helplines',
    description: 'Anonymous and confidential support anytime you need',
    services: ['NACO Helpline: 1097', 'AIDS Helpline: 1800-11-2-3377', 'Crisis counseling', 'Referrals'],
    color: 'from-purple-500 to-purple-600',
    phone: '1097'
  },
  {
    icon: '🤝',
    title: 'Support Groups',
    description: 'Connect with others living with HIV for peer support',
    services: ['Weekly meetings', 'Share experiences', 'Emotional support', 'Reduce isolation'],
    color: 'from-green-500 to-green-600',
    phone: 'Ask at ART center'
  },
  {
    icon: '💊',
    title: 'PrEP Clinics',
    description: 'Access prevention medication if you\'re at risk',
    services: ['Free PrEP', 'HIV testing', 'Counseling', 'Follow-up care'],
    color: 'from-rose-500 to-rose-600',
    phone: 'Find via NACO website'
  },
  {
    icon: '🧑‍⚖️',
    title: 'Legal Aid',
    description: 'Protection against discrimination and human rights violations',
    services: ['Legal counseling', 'Know your rights', 'File complaints', 'Free legal aid'],
    color: 'from-orange-500 to-orange-600',
    phone: 'State AIDS Control Society'
  },
  {
    icon: '🧠',
    title: 'Mental Health',
    description: 'Therapy and counseling for emotional well-being',
    services: ['Depression support', 'Anxiety management', 'Coping strategies', 'Professional counseling'],
    color: 'from-teal-500 to-teal-600',
    phone: 'NIMHANS: 080-26995000'
  }
];

const stateHelplines = [
  { state: 'Kerala', number: '0471-2552056', artCenters: '30+' },
  { state: 'Tamil Nadu', number: '044-28394042', artCenters: '40+' },
  { state: 'Karnataka', number: '080-22867132', artCenters: '35+' },
  { state: 'Maharashtra', number: '022-26591919', artCenters: '50+' },
  { state: 'Delhi', number: '011-23921037', artCenters: '25+' }
];

export default function WhereToGetHelp() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">
              Get Help
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/home" className="text-sm font-bold text-slate-600 hover:text-primary-600">Home</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block p-4 bg-emerald-100 rounded-2xl mb-6">
              <span className="text-6xl">🤗</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              You Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Not Alone</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Whether you need testing, treatment, counseling, or just someone to talk to—help is available and free across India.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <a href="tel:1097" className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg flex items-center gap-2">
                <span>📞</span> Call 1097 (24/7 Helpline)
              </a>
              <span className="text-sm text-slate-500 font-medium">Confidential & Free</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="py-8 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex items-start gap-4 bg-white rounded-2xl p-6 shadow-md">
            <div className="text-4xl">🚨</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-900 mb-2">Potential HIV Exposure?</h3>
              <p className="text-red-700 mb-3">
                If you've been exposed to HIV in the last <span className="font-bold">72 hours</span>, immediately visit a hospital for <span className="font-bold">PEP (Post-Exposure Prophylaxis)</span>.
              </p>
              <p className="text-sm text-red-600">PEP can prevent HIV infection if started within 72 hours. Time is critical!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Comprehensive Support Services
            </h2>
            <p className="text-lg text-slate-600">All services are free and confidential</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {helpResources.map((resource, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100 hover:shadow-2xl transition-all"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center text-4xl mb-6`}>
                  {resource.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">{resource.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{resource.description}</p>
                
                <div className="space-y-2 mb-6">
                  {resource.services.map((service, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-slate-700">{service}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 font-bold mb-1">Contact:</p>
                  <p className="font-bold text-slate-900">{resource.phone}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* State Helplines */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              State-Wise Helplines
            </h2>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">National AIDS Helpline</h3>
                    <p className="text-blue-100 text-sm">Available 24/7 in multiple languages</p>
                  </div>
                  <a href="tel:1097" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-all">
                    📞 1097
                  </a>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {stateHelplines.map((state, idx) => (
                  <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{state.state}</h4>
                        <p className="text-sm text-slate-500">{state.artCenters} ART Centers</p>
                      </div>
                      <a href={`tel:${state.number}`} className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full font-bold hover:bg-blue-100 transition-colors">
                        📞 {state.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-slate-500 mt-6 text-sm">
              For other states, call <a href="tel:1097" className="text-blue-600 font-bold">1097</a> for local ART center information
            </p>
          </div>
        </div>
      </section>

      {/* Online Resources */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              Online Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🌐</span> Official Websites
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="http://naco.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      NACO - National AIDS Control Organisation
                    </a>
                  </li>
                  <li>
                    <a href="http://naco.gov.in/art-centre-list" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Find Nearest ART Center
                    </a>
                  </li>
                  <li>
                    <a href="http://naco.gov.in/ictc-list" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Find HIV Testing Center (ICTC)
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">💬</span> Online Support
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Join online support groups and forums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Anonymous chat counseling available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Email support for queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">WhatsApp counseling (Ask at ART center)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Know Your Rights */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              Know Your Rights
            </h2>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-green-500">✓</span> You Have the Right To:
                  </h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Confidential testing and treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Work and live without discrimination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Free ART medicines and care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Privacy - no forced disclosure</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-red-500">✗</span> Discrimination is Illegal:
                  </h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Cannot be fired for HIV status</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Cannot be denied healthcare</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Cannot be denied insurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>File complaints to State AIDS Society</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Help is Just a Call Away</h2>
          <p className="text-xl mb-8 text-emerald-100">Don't hesitate. Reach out today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:1097" className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2">
              <span>📞</span> Call 1097 Now
            </a>
            <Link to="/home" className="bg-emerald-800 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-900 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
