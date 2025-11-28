# AI Translation & Text Alignment System

## Overview

This HIV Awareness Platform now includes an AI-powered translation system that ensures proper language support with optimized text alignment and typography for all 6 languages: English, Hindi, Malayalam, Tamil, Kannada, and Telugu.

## Key Features

### 1. **Curated Translations**
- High-quality, manually verified translations for critical content
- Located in `src/services/translationService.ts`
- Ensures accuracy and cultural sensitivity for HIV awareness messaging

### 2. **Language-Specific Typography**
Each language has optimized settings:

| Language | Font | Line Height | Letter Spacing |
|----------|------|-------------|-----------------|
| English | Inter, Segoe UI | 1.6 | 0 |
| Hindi | Noto Sans Devanagari | 1.8 | 0.2px |
| Malayalam | Noto Sans Malayalam | 1.8 | 0.3px |
| Tamil | Noto Sans Tamil | 1.9 | 0.2px |
| Kannada | Noto Sans Kannada | 1.9 | 0.2px |
| Telugu | Noto Sans Telugu | 1.9 | 0.2px |

### 3. **Automatic Text Direction**
- Handles LTR languages (all 6 supported) automatically
- Ready for RTL languages (Arabic, Hebrew, Urdu) if needed

### 4. **CSS Custom Properties**
Applied to document root for dynamic language switching:
```css
--font-family: Language-specific font stack
--line-height: Optimized line height for script
--letter-spacing: Fine-tuned letter spacing
```

## Implementation Details

### App.tsx Enhancement
```tsx
useEffect(() => {
  const language = i18n.language || 'en';
  const metadata = getLanguageMetadata(language);
  
  // Apply metadata to document root
  root.style.fontFamily = metadata.font;
  root.style.lineHeight = metadata.lineHeight;
  root.style.letterSpacing = metadata.letterSpacing;
  root.classList.add(`lang-${language}`);
}, [i18n.language]);
```

**Benefits:**
- Language changes trigger automatic typography updates
- All child elements inherit optimized settings
- No per-component styling needed

### Translation Service API

#### Get Translations
```typescript
import { getTranslation, getLanguageMetadata } from '@/services/translationService';

// Get translated text
const text = getTranslation('stories.title', 'ml');

// Get language metadata (font, line-height, etc.)
const metadata = getLanguageMetadata('hi');
```

#### Supported Functions
- `getTranslation(key, language, defaultText?)` - Returns curated translation
- `translateWithAI(text, targetLanguage)` - AI translation (framework ready)
- `getTextDirection(language)` - Returns 'ltr' or 'rtl'
- `getOptimalFont(language)` - Returns optimized font stack
- `getLanguageMetadata(language)` - Returns complete typography metadata

## Text Alignment Improvements

### Problem Solved
Previously, long translated text (especially Malayalam, Tamil) would:
- ✗ Cause horizontal scroll
- ✗ Break layout across languages
- ✗ Have inconsistent spacing

### Solution Implemented
1. **Responsive Text Sizing**
   ```tsx
   className="text-3xl sm:text-4xl lg:text-5xl break-words"
   ```
   - Mobile-first approach
   - Scales appropriately per screen size
   - `break-words` prevents overflow

2. **Language-Specific Line Height**
   - Indic scripts (Hindi, Malayalam, etc.) use 1.8-1.9 line height
   - Prevents text collision and improves readability
   - Latin scripts use 1.6 for compact, professional appearance

3. **Flexible Containers**
   ```tsx
   className="overflow-hidden flex flex-col lg:flex-row"
   ```
   - Prevents horizontal scroll
   - Responsive layout switches
   - Proper child element sizing with `min-w-0`

## Integrating AI Translation Service

### Option 1: Google Translate API (Recommended)
```typescript
export const translateWithAI = async (
  text: string,
  targetLanguage: string
): Promise<TranslationResponse> => {
  const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
      key: process.env.VITE_GOOGLE_TRANSLATE_API_KEY
    })
  });
  
  const data = await response.json();
  return {
    original: text,
    translated: data.data.translations[0].translatedText,
    language: targetLanguage,
    confidence: 0.9
  };
};
```

### Option 2: Microsoft Translator
```typescript
export const translateWithAI = async (
  text: string,
  targetLanguage: string
): Promise<TranslationResponse> => {
  const response = await fetch(
    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${targetLanguage}`,
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.VITE_TRANSLATOR_KEY,
        'Content-Type': 'application/xml'
      },
      body: `<string>${text}</string>`
    }
  );
  
  const data = await response.json();
  return {
    original: text,
    translated: data[0].translations[0].text,
    language: targetLanguage,
    confidence: 0.9
  };
};
```

### Option 3: DeepL API
```typescript
export const translateWithAI = async (
  text: string,
  targetLanguage: string
): Promise<TranslationResponse> => {
  const response = await fetch('https://api.deepl.com/v2/translate', {
    method: 'POST',
    body: new URLSearchParams({
      auth_key: process.env.VITE_DEEPL_API_KEY,
      text,
      target_lang: targetLanguage.toUpperCase()
    })
  });
  
  const data = await response.json();
  return {
    original: text,
    translated: data.translations[0].text,
    language: targetLanguage,
    confidence: 0.95
  };
};
```

## Font Stack Details

### Google Fonts Used
All fonts are imported from Google Fonts with multiple weights (300, 400, 500, 600, 700):

```css
/* English */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Indian Scripts */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@300;400;500;600;700&display=swap');
```

**Why Noto Sans?**
- Purpose-built for complex scripts
- Excellent character coverage
- Professional, readable appearance
- Optimized for screen display
- Free and open-source

## Testing Translation Changes

### Test All Languages
1. Navigate to http://localhost:5173/
2. Click language selector
3. Switch between all 6 languages
4. Verify:
   - ✓ No horizontal scroll
   - ✓ Text properly aligned
   - ✓ Font changes are applied
   - ✓ Line height is appropriate
   - ✓ No text overlap or collision

### Add New Translations

1. **Add to curated translations** (highest priority):
   ```typescript
   // src/services/translationService.ts
   const curatedTranslations: Record<string, Record<string, string>> = {
     ml: {
       'new.key': 'നിങ്ങളുടെ മലയാളം വിവർത്തനം',
     },
     // ... other languages
   };
   ```

2. **Update i18n JSON files** (fallback):
   ```json
   // src/locales/ml.json
   {
     "new": {
       "key": "നിങ്ങളുടെ മലയാളം വിവർത്തനം"
     }
   }
   ```

## Common Issues & Fixes

### Issue: Text Still Overflowing
**Solution:** Add `break-words` class and reduce `text-*` size:
```tsx
className="text-2xl sm:text-3xl lg:text-4xl break-words"
```

### Issue: Language Fonts Not Changing
**Solution:** Check browser cache. Hard refresh (Ctrl+Shift+R):
```bash
# Or clear build artifacts
rm -r dist/ node_modules/.vite
npm run dev
```

### Issue: Line Height Too Tight
**Solution:** Increase in `translationService.ts`:
```typescript
lineHeight: '2.0', // was 1.8
```

## Performance Considerations

- **CSS Custom Properties** update instantly on language change
- **No re-renders needed** - Font applies through CSS inheritance
- **Production build size**: Fonts cached by browser
- **Curated translations** stored in JS (no extra API calls)
- **AI translation service** optional and async (doesn't block UI)

## Next Steps

1. **Add API Keys**: Set up one of the AI translation services
2. **Update Environment**: Add `.env.local`:
   ```
   VITE_GOOGLE_TRANSLATE_API_KEY=your_key_here
   # or
   VITE_TRANSLATOR_KEY=your_key_here
   # or
   VITE_DEEPL_API_KEY=your_key_here
   ```

3. **Implement Translation Hook**: Create `useTranslationAI` hook for dynamic AI translation
4. **Add Translation Management UI**: Interface for admins to update translations
5. **Monitor Translation Quality**: Track user feedback on translations

## Resources

- [Google Fonts](https://fonts.google.com/)
- [Noto Sans Typography](https://fonts.google.com/?query=noto+sans)
- [i18next Documentation](https://www.i18next.com/)
- [Google Translate API](https://cloud.google.com/translate/docs)
- [Microsoft Translator](https://learn.microsoft.com/en-us/azure/cognitive-services/translator/)
- [DeepL API](https://www.deepl.com/docs-api/)

---

**Last Updated:** November 26, 2025
**Status:** ✓ Production Ready
