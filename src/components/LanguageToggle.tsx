import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105"
      aria-label="Toggle language"
      title={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <span className="text-xl" role="img" aria-label={i18n.language === 'en' ? 'US Flag' : 'Saudi Flag'}>
        {i18n.language === 'en' ? '🇺🇸' : '🇸🇦'}
      </span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {i18n.language === 'en' ? 'EN' : 'AR'}
      </span>
    </button>
  );
};

export default LanguageToggle;
