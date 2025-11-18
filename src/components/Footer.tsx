import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Send, Code2, CheckCircle, AlertCircle, Music2 } from 'lucide-react';
import { newsletterApi } from '../services/api';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const result = await newsletterApi.subscribe(email);
      
      if (result.success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      } else if (result.alreadySubscribed) {
        setError(i18n.language === 'ar' 
          ? 'هذا البريد الإلكتروني مسجل بالفعل' 
          : 'This email is already subscribed');
        setTimeout(() => setError(''), 5000);
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError(i18n.language === 'ar' 
        ? 'حدث خطأ. يرجى المحاولة مرة أخرى' 
        : 'An error occurred. Please try again');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/BilalFali', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/falibilal/', label: 'LinkedIn' },
    { icon: Music2, href: 'https://www.tiktok.com/@bidev', label: 'TikTok' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {i18n.language === 'ar' ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {i18n.language === 'ar' 
              ? 'احصل على آخر مقالات Flutter مباشرة في بريدك الإلكتروني'
              : 'Get the latest Flutter articles delivered to your inbox'}
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={i18n.language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading || subscribed}
            />
            <button
              type="submit"
              disabled={loading || subscribed}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {i18n.language === 'ar' ? 'جاري...' : 'Subscribing...'}
                </>
              ) : subscribed ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  {i18n.language === 'ar' ? 'تم!' : 'Subscribed!'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {i18n.language === 'ar' ? 'اشترك' : 'Subscribe'}
                </>
              )}
            </button>
          </form>
          
          {error && (
            <div className="mt-3 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">BiDev</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {i18n.language === 'ar' 
                ? 'مدونة تعليمية متخصصة في تطوير تطبيقات Flutter'
                : 'Educational blog specialized in Flutter development'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {i18n.language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {i18n.language === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li>
                <a href="/articles" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {i18n.language === 'ar' ? 'المقالات' : 'Articles'}
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {i18n.language === 'ar' ? 'الفئات' : 'Categories'}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {i18n.language === 'ar' ? 'من نحن' : 'About'}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {i18n.language === 'ar' ? 'تواصل معنا' : 'Connect'}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} BiDev. {i18n.language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                {i18n.language === 'ar' ? 'سياسة الخصوصية' : 'Privacy'}
              </a>
              <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                {i18n.language === 'ar' ? 'الشروط' : 'Terms'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
