import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getLanguageMetadata } from './services/translationService';
import LanguageLanding from './pages/LanguageLanding';
import Homepage from './pages/Homepage';
import AwarenessHub from './pages/AwarenessHub';
import Dashboard from './pages/Dashboard';
import Stories from './pages/Stories';
import Games from './pages/Games';
import Podcasts from './pages/Podcasts';
import Admin from './pages/Admin';
import TopicDetail from './pages/TopicDetail';
import HowToPreventHIV from './pages/InfoPages/HowToPreventHIV';
import HowHIVSpreads from './pages/InfoPages/HowHIVSpreads';
import HIVTestingExplained from './pages/InfoPages/HIVTestingExplained';
import TreatmentWorks from './pages/InfoPages/TreatmentWorks';
import WhereToGetHelp from './pages/InfoPages/WhereToGetHelp';
import './locales/i18n';

function App() {
  const { userPreferences } = useAppStore();
  const { i18n } = useTranslation();

  // Apply language-specific styling
  useEffect(() => {
    const language = i18n.language || 'en';
    const metadata = getLanguageMetadata(language);
    
    // Apply to document root
    const root = document.documentElement;
    root.lang = language;
    root.dir = metadata.direction;
    root.style.fontFamily = metadata.font;
    root.style.lineHeight = metadata.lineHeight;
    root.style.letterSpacing = metadata.letterSpacing;
    
    // Add language-specific class for CSS customization
    root.classList.remove('lang-en', 'lang-hi', 'lang-ml', 'lang-ta', 'lang-kn', 'lang-te');
    root.classList.add(`lang-${language}`);
    
    // Store font metadata in CSS custom properties
    root.style.setProperty('--font-family', metadata.font);
    root.style.setProperty('--line-height', metadata.lineHeight);
    root.style.setProperty('--letter-spacing', metadata.letterSpacing);
  }, [i18n.language]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userPreferences.hasCompletedIntro ? (
              <Navigate to="/home" replace />
            ) : (
              <LanguageLanding />
            )
          }
        />
        <Route path="/home" element={<Homepage />} />
        <Route path="/awareness" element={<AwarenessHub />} />
        <Route path="/awareness/:topicId" element={<TopicDetail />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:gameId" element={<Games />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/podcasts" element={<Podcasts />} />
        
        {/* Information Pages */}
        <Route path="/info/prevention" element={<HowToPreventHIV />} />
        <Route path="/info/transmission" element={<HowHIVSpreads />} />
        <Route path="/info/testing" element={<HIVTestingExplained />} />
        <Route path="/info/treatment" element={<TreatmentWorks />} />
        <Route path="/info/help" element={<WhereToGetHelp />} />
        
        {/* Add more routes as needed */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
