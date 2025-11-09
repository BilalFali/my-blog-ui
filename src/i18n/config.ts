import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      home: 'Home',
      articles: 'Articles',
      about: 'About',
      
      // Hero
      heroTitle: 'Flutter Developer & Tech Writer',
      heroSubtitle: 'Sharing Flutter tutorials, code tips, and best practices',
      
      // Home Page
      latestArticles: 'Latest Articles',
      allArticles: 'All Articles',
      categories: 'Categories',
      tags: 'Tags',
      readMore: 'Read More',
      minuteRead: 'min read',
      
      // Article Page
      relatedPosts: 'Related Posts',
      shareArticle: 'Share Article',
      
      // About Page
      aboutMe: 'About Me',
      myStory: 'My Story',
      skills: 'Skills',
      connect: 'Connect With Me',
      
      // Footer
      allRightsReserved: 'All rights reserved',
      
      // Common
      loading: 'Loading...',
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
  },
  ar: {
    translation: {
      // Navbar
      home: 'الرئيسية',
      articles: 'المقالات',
      about: 'عني',
      
      // Hero
      heroTitle: 'مطور فلاتر وكاتب تقني',
      heroSubtitle: 'مشاركة دروس فلاتر ونصائح برمجية وأفضل الممارسات',
      
      // Home Page
      latestArticles: 'أحدث المقالات',
      allArticles: 'جميع المقالات',
      categories: 'التصنيفات',
      tags: 'الوسوم',
      readMore: 'اقرأ المزيد',
      minuteRead: 'دقيقة قراءة',
      
      // Article Page
      relatedPosts: 'مقالات ذات صلة',
      shareArticle: 'شارك المقال',
      
      // About Page
      aboutMe: 'عني',
      myStory: 'قصتي',
      skills: 'المهارات',
      connect: 'تواصل معي',
      
      // Footer
      allRightsReserved: 'جميع الحقوق محفوظة',
      
      // Common
      loading: 'جارٍ التحميل...',
      language: 'اللغة',
      darkMode: 'الوضع الداكن',
      lightMode: 'الوضع الفاتح',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
