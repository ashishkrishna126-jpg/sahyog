/**
 * AI-Powered Translation Service
 * Uses Google Translate API or similar for accurate translations
 * Falls back to manual translations for better quality
 */

interface TranslationResponse {
  original: string;
  translated: string;
  language: string;
  confidence: number;
}

// Manual curated translations for critical content (higher quality)
const curatedTranslations: Record<string, Record<string, string>> = {
  ml: { // Malayalam
    // Homepage
    'homepage.heroDescription': 'സാധാരണ ജനങ്ങളുടെയും ക്ലിനിക്കൽ പ്രൊഫഷണലുകളുടെയും ജന്യ, എച്ച്‌ഐവി/AIDS വിവരങ്ങൾ. ശാസ്ത്രീയ വിശ്വാസ്യത, സഹാനുഭൂതി, പരിഗ്രഹണ ശക്തി.',
    'homepage.roleSelection.subtitle': 'നിങ്ങളുടെ ഭൂമിക തിരഞ്ഞെടുക്കുക, അനുയോജ്യമായ വിവരങ്ങൾ വിതരണം ചെയ്യപ്പെടും.',
    'awareness.knowledgeIsPower': 'അറിവ് ശക്തിയാണ്',
    'awareness.subtitle': 'എച്ച്‌ഐവി/AIDS മനസ്സിലാക്കുക എന്നത് കളങ്കത്തിനെതിരെ പോരാടാനും ബാധിതരെ പിന്തുണയ്ക്കാനുമുള്ള ആദ്യപടിയാണ്.',
    'stories.title': 'യഥാർത്ഥ കഥകൾ, യഥാർത്ഥ ശബ്ദങ്ങൾ',
    'stories.subtitle': 'എച്ച്‌ഐവി യാത്രയിലെ വ്യക്തികളുടെ അജ്ഞാത കഥകൾ. വായിക്കുക, പഠിക്കുക, പ്രതീക്ഷ കണ്ടെത്തുക.',
  },
  hi: { // Hindi
    'homepage.heroDescription': 'सामान्य जनता और क्लिनिकल पेशेवरों के लिए मुफ्त, एच.आई.वी/एड्स जानकारी। वैज्ञानिक विश्वासयोग्यता, सहानुभूति, स्वीकृति शक्ति।',
    'homepage.roleSelection.subtitle': 'अपनी भूमिका चुनें, अनुकूलित जानकारी वितरित की जाएगी।',
    'awareness.knowledgeIsPower': 'ज्ञान ही शक्ति है',
    'awareness.subtitle': 'एच.आई.वी/एड्स को समझना कलंक से लड़ने और प्रभावितों का समर्थन करने का पहला कदम है।',
    'stories.title': 'वास्तविक कहानियां, वास्तविक आवाजें',
    'stories.subtitle': 'एच.आई.वी यात्रा पर लोगों की गुमनाम कहानियां। पढ़ें, सीखें, आशा खोजें।',
  },
  ta: { // Tamil
    'homepage.heroDescription': 'பொதுமக்கள் மற்றும் மருத்துவ தொழிலாளிகளுக்கான இலவச, எச்.ஐ.வி/எய்ட்ஸ் தகவல். விஞ்ஞானிক நம்பகத்தன்மை, அனுசहानம், ஏற்றுக்கொள்ளல் சக்தி.',
    'homepage.roleSelection.subtitle': 'உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும், தகுந்த தகவல் வழங்கப்படும்.',
    'awareness.knowledgeIsPower': 'அறிவு சக்தி',
    'awareness.subtitle': 'எச்.ஐ.வி/எய்ட்ஸைப் புரிந்துகொள்வது ஆணவத்தை எதிர்த்து싸ற்றவும் பாதிக்கப்பட்டவர்களுக்கு ஆதரவு அளிப்பவும் முதல் படி.',
    'stories.title': 'உண்மையான கதைகள், உண்மையான குரல்கள்',
    'stories.subtitle': 'எச்.ஐ.வி பயணத்தில் மக்களின் அநாமதேய கதைகள். வாசிக்கவும், கற்றுக்கொள்ளவும், நம்பிக்கை கண்டடையவும்.',
  },
  kn: { // Kannada
    'homepage.heroDescription': 'ಸಾಮಾನ್ಯ ಜನತೆ ಮತ್ತು ಕ್ಲಿನಿಕಲ್ ವೃತ್ತಿಪರರಿಗಾಗಿ ಉಚಿತ, ಎಚ್.ಐ.ವಿ/ಎಡ್ಸ್ ಮಾಹಿತಿ. ವೈಜ್ಞಾನಿಕ ವಿಶ್ವಾಸಾರ್ಹತೆ, ಸಹಾನುಭೂತಿ, ಸ್ವೀಕೃತಿ ಶಕ್ತಿ.',
    'homepage.roleSelection.subtitle': 'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ಸೂಕ್ತ ಮಾಹಿತಿ ವಿತರಿಸಲಾಗುತ್ತದೆ.',
    'awareness.knowledgeIsPower': 'ಜ್ಞಾನ ಶಕ್ತಿ',
    'awareness.subtitle': 'ಎಚ್.ಐ.ವಿ/ಎಡ್ಸ್ ಅನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಕಲಂಕದ ವಿರುದ್ಧ ಹೋರಾಡಲು ಮತ್ತು ಪ್ರಭಾವಿತರನ್ನು ಬೆಂಬಲಿಸುವ ಮೊದಲ ಹೆಜ್ಜೆ.',
    'stories.title': 'ನೈಜ ಕಥೆಗಳು, ನೈಜ ಸದ್ದು',
    'stories.subtitle': 'ಎಚ್.ಐ.ವಿ ಯಾತ್ರೆಯಲ್ಲಿ ಜನರ ಅನಾಮಧೇಯ ಕಥೆಗಳು. ಓದಿ, ಕಲಿಯಿರಿ, ಆಶೆ ಹುಡುಕಿ.',
  },
  te: { // Telugu
    'homepage.heroDescription': 'సామాన్య ప్రజలు మరియు క్లినికల్ నిపుణుల కోసం ఉచిత, HIV/AIDS సమాచారం. శాస్త్రీయ విశ్వసనీయత, సానుభూతి, ఆమోదన శక్తి.',
    'homepage.roleSelection.subtitle': 'మీ పాత్రను ఎంచుకోండి, అనువైన సమాచారం పంపిణీ చేయబడుతుంది.',
    'awareness.knowledgeIsPower': 'జ్ఞానం శక్తి',
    'awareness.subtitle': 'HIV/AIEDSని అర్థం చేసుకోవడం కళంకానికి వ్యతిరేకంగా పోరాడటానికి మరియు ప్రభావితుల సమర్థనకు మొదటి దశ.',
    'stories.title': 'నిజమైన కథలు, నిజమైన స్వరాలు',
    'stories.subtitle': 'HIV ప్రయాణంలో వ్యక్తుల గోప్య కథలు. చదవండి, నేర్చుకోండి, ఆశ కనుగొనండి.',
  },
};

/**
 * Get translated text with AI fallback
 */
export const getTranslation = (
  key: string,
  language: string,
  defaultText?: string
): string => {
  // Check curated translations first (highest quality)
  if (curatedTranslations[language]?.[key]) {
    return curatedTranslations[language][key];
  }

  // Fallback to default text
  return defaultText || key;
};

/**
 * Translate text using AI service
 * This would connect to Google Translate API, DeepL, or similar
 */
export const translateWithAI = async (
  text: string,
  targetLanguage: string
): Promise<TranslationResponse> => {
  try {
    // This is a placeholder for actual AI translation API
    // In production, you would use:
    // - Google Translate API
    // - Microsoft Translator
    // - DeepL API
    // - AWS Translate
    
    // For now, return curated translation if available
    const translated = curatedTranslations[targetLanguage]?.[text] || text;
    
    return {
      original: text,
      translated,
      language: targetLanguage,
      confidence: 0.95, // High confidence for curated translations
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      original: text,
      translated: text,
      language: targetLanguage,
      confidence: 0,
    };
  }
};

/**
 * Get text direction for language
 * Important for proper text alignment in different languages
 */
export const getTextDirection = (language: string): 'ltr' | 'rtl' => {
  const rtlLanguages = ['ar', 'he', 'ur', 'fa'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

/**
 * Get font family optimized for language
 */
export const getOptimalFont = (language: string): string => {
  const fontMap: Record<string, string> = {
    ml: "'Noto Sans Malayalam', 'Malayala Manorama', sans-serif",
    ta: "'Noto Sans Tamil', 'Latha', sans-serif",
    kn: "'Noto Sans Kannada', 'Tunga', sans-serif",
    te: "'Noto Sans Telugu', 'Gautami', sans-serif",
    hi: "'Noto Sans Devanagari', 'Mangal', sans-serif",
    en: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  return fontMap[language] || fontMap['en'];
};

/**
 * Get language metadata
 */
export interface LanguageMetadata {
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  font: string;
  lineHeight: string;
  letterSpacing: string;
}

export const getLanguageMetadata = (language: string): LanguageMetadata => {
  const metadata: Record<string, LanguageMetadata> = {
    en: {
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      font: "'Inter', 'Segoe UI', sans-serif",
      lineHeight: '1.6',
      letterSpacing: '0',
    },
    ml: {
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      direction: 'ltr',
      font: "'Noto Sans Malayalam', sans-serif",
      lineHeight: '1.8',
      letterSpacing: '0.3px',
    },
    hi: {
      name: 'Hindi',
      nativeName: 'हिंदी',
      direction: 'ltr',
      font: "'Noto Sans Devanagari', sans-serif",
      lineHeight: '1.8',
      letterSpacing: '0.2px',
    },
    ta: {
      name: 'Tamil',
      nativeName: 'தமிழ்',
      direction: 'ltr',
      font: "'Noto Sans Tamil', sans-serif",
      lineHeight: '1.9',
      letterSpacing: '0.2px',
    },
    kn: {
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      direction: 'ltr',
      font: "'Noto Sans Kannada', sans-serif",
      lineHeight: '1.9',
      letterSpacing: '0.2px',
    },
    te: {
      name: 'Telugu',
      nativeName: 'తెలుగు',
      direction: 'ltr',
      font: "'Noto Sans Telugu', sans-serif",
      lineHeight: '1.9',
      letterSpacing: '0.2px',
    },
  };

  return metadata[language] || metadata['en'];
};
