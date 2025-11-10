import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Youtube, Twitter, Mail, Code2, Palette, Smartphone } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const skills = [
    { icon: Smartphone, name: 'Flutter Development', color: 'text-blue-600' },
    { icon: Code2, name: 'Dart Programming', color: 'text-green-600' },
    { icon: Palette, name: 'UI/UX Design', color: 'text-purple-600' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/bidev', label: 'GitHub', color: 'hover:bg-gray-800' },
    { icon: Linkedin, href: 'https://linkedin.com/in/bidev', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Youtube, href: 'https://youtube.com/@bidev', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: Twitter, href: 'https://twitter.com/bidev', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Mail, href: 'mailto:contact@bidev.com', label: 'Email', color: 'hover:bg-green-600' },
  ];

  const bioEn = {
    intro: "Welcome to BiDev 👋",
    paragraph1: "BiDev is your go-to platform for mastering Flutter development. We provide comprehensive articles, in-depth guides, and practical code examples to help you build amazing cross-platform applications.",
    paragraph2: "Our mission is to make Flutter development accessible to everyone - from beginners taking their first steps in mobile development to experienced developers looking to level up their skills. Every article is crafted with care, focusing on real-world scenarios and best practices.",
    paragraph3: "We cover everything from basic widgets and layouts to advanced topics like state management, animations, Firebase integration, and performance optimization. Join our growing community of Flutter developers!",
  };

  const bioAr = {
    intro: "مرحباً بك في BiDev 👋",
    paragraph1: "BiDev هي منصتك المثالية لإتقان تطوير Flutter. نقدم مقالات شاملة وأدلة متعمقة وأمثلة عملية لمساعدتك في بناء تطبيقات متعددة المنصات رائعة.",
    paragraph2: "مهمتنا هي جعل تطوير Flutter متاحاً للجميع - من المبتدئين الذين يخطون خطواتهم الأولى في تطوير التطبيقات إلى المطورين ذوي الخبرة الذين يتطلعون لتطوير مهاراتهم. كل مقال مصمم بعناية، مع التركيز على السيناريوهات الواقعية وأفضل الممارسات.",
    paragraph3: "نغطي كل شيء من الويدجتس الأساسية والتخطيطات إلى المواضيع المتقدمة مثل إدارة الحالة والرسوم المتحركة وتكامل Firebase وتحسين الأداء. انضم إلى مجتمعنا المتنامي من مطوري Flutter!",
  };

  const bio = isArabic ? bioAr : bioEn;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('aboutMe')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
        </div>

        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            {/* Avatar */}
            <div className="md:w-1/3 bg-gradient-to-br from-primary-500 to-accent-500 p-8 flex items-center justify-center">
              <div className="w-48 h-48 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-8xl font-bold text-primary-600">
                B
              </div>
            </div>

            {/* Bio */}
            <div className="md:w-2/3 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {bio.intro}
              </h2>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>{bio.paragraph1}</p>
                <p>{bio.paragraph2}</p>
                <p>{bio.paragraph3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('skills')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
              >
                <skill.icon className={`w-12 h-12 mx-auto mb-4 ${skill.color}`} />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t('connect')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {isArabic 
              ? 'دعنا نتواصل! تابعني على وسائل التواصل الاجتماعي أو راسلني مباشرة.'
              : "Let's connect! Follow me on social media or reach out directly."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg transition-all ${social.color} shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              >
                <social.icon className="w-5 h-5" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
