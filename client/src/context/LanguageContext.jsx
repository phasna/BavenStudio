import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../lib/translations.js';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'baven-lang';

function loadLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'fr' ? stored : 'fr';
  } catch {
    return 'fr';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(loadLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore */
    }
  }, [language]);

  function t(key, ...params) {
    const entry = translations[key];
    if (!entry) return key;
    const value = entry[language];
    return typeof value === 'function' ? value(...params) : value;
  }

  const value = { language, setLanguage, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
  return ctx;
}
