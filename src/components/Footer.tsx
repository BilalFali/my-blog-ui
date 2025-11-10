import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Youtube, Twitter, Send, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/bidev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/bidev', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@bidev', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com/bidev', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 mb-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {i18n.language === 'ar' ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              {i18n.language === 'ar' 
                ? 'احصل على آخر مقالات Flutter مباشرة في بريدك الإلكتروني'
                : 'Get the latest Flutter articles delivered directly to your inbox'}
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={i18n.language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="flex-1 px-6 py-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
                required
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  i18n.language === 'ar' ? 'تم الاشتراك!' : 'Subscribed!'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {i18n.language === 'ar' ? 'اشترك' : 'Subscribe'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">BiDev</span>
                <p className="text-blue-200 text-sm">Flutter Development</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {i18n.language === 'ar' 
                ? 'منصة تعليمية متخصصة في تطوير تطبيقات Flutter. نقدم مقالات شاملة ومتعمقة لمساعدتك على إتقان تطوير التطبيقات متعددة المنصات.'
                : 'Educational platform specialized in Flutter app development. We provide comprehensive and in-depth articles to help you master cross-platform development.'}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/10 hover:bg-blue-500 transition-all backdrop-blur-sm border border-white/10"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-200">
              {i18n.language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {i18n.language === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li>
                <a href="/articles" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {i18n.language === 'ar' ? 'المقالات' : 'Articles'}
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {i18n.language === 'ar' ? 'الفئات' : 'Categories'}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  {i18n.language === 'ar' ? 'من نحن' : 'About'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-200">
              {i18n.language === 'ar' ? 'مواضيع Flutter' : 'Flutter Topics'}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/category/widgets" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  Widgets
                </a>
              </li>
              <li>
                <a href="/category/state-management" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  State Management
                </a>
              </li>
              <li>
                <a href="/category/animations" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  Animations
                </a>
              </li>
              <li>
                <a href="/category/firebase" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>→</span>
                  Firebase
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} BiDev. {i18n.language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                {i18n.language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                {i18n.language === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
