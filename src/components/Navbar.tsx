import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">BiDev</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {i18n.language === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <a href="/articles" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {i18n.language === 'ar' ? 'المقالات' : 'Articles'}
            </a>
            <a href="/categories" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {i18n.language === 'ar' ? 'الفئات' : 'Categories'}
            </a>
            <a href="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {i18n.language === 'ar' ? 'من نحن' : 'About'}
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">\n            {/* Language Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-haspopup="listbox"
                aria-expanded="false"
                type="button"
              >
                <span className="text-base" role="img" aria-label="Language">
                  {i18n.language === 'ar' ? '🇸🇦' : '🇺🇸'}
                </span>
                <span className="text-sm">
                  {i18n.language === 'ar' ? 'AR' : 'EN'}
                </span>
              </button>
              <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50" tabIndex={-1} role="listbox">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-t-lg text-gray-700 dark:text-gray-200"
                    onClick={() => {
                      i18n.changeLanguage('en');
                      document.documentElement.dir = 'ltr';
                      document.documentElement.lang = 'en';
                    }}
                  >
                    🇺🇸 English
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-b-lg text-gray-700 dark:text-gray-200"
                    onClick={() => {
                      i18n.changeLanguage('ar');
                      document.documentElement.dir = 'rtl';
                      document.documentElement.lang = 'ar';
                    }}
                  >
                    🇸🇦 العربية
                  </button>
                </li>
              </ul>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
