import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-14">
          {/* Actions - About Me, Language Dropdown, Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* About Me Button */}
            <a
              href="https://portfolio.bidev.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-all text-sm"
            >
              About Me
            </a>

            {/* Language Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105"
                aria-haspopup="listbox"
                aria-expanded="false"
                type="button"
              >
                <span className="text-xl" role="img" aria-label="Language">
                  {i18n.language === 'ar' ? '🇸🇦' : '🇺🇸'}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {i18n.language === 'ar' ? 'AR' : 'EN'}
                </span>
                <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
