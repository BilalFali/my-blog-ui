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
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub', color: 'hover:bg-gray-800' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Youtube, href: 'https://youtube.com/@yourchannel', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email', color: 'hover:bg-green-600' },
  ];

  const bioEn = {
    intro: "Hi, I'm Bilal 👋",
    paragraph1: "I'm a passionate Flutter developer and tech writer dedicated to sharing knowledge and helping developers build amazing mobile applications.",
    paragraph2: "With years of experience in mobile development, I've worked on various projects ranging from simple apps to complex enterprise solutions. My mission is to make Flutter development more accessible through detailed tutorials and practical code examples.",
    paragraph3: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or creating educational content for the developer community.",
  };

  const bioAr = {
    intro: "مرحباً، أنا بلال 👋",
    paragraph1: "أنا مطور فلاتر شغوف وكاتب تقني مكرس لمشاركة المعرفة ومساعدة المطورين في بناء تطبيقات موبايل رائعة.",
    paragraph2: "مع سنوات من الخبرة في تطوير تطبيقات الموبايل، عملت على مشاريع متنوعة تتراوح من التطبيقات البسيطة إلى حلول المؤسسات المعقدة. مهمتي هي جعل تطوير فلاتر أكثر سهولة من خلال دروس تفصيلية وأمثلة عملية.",
    paragraph3: "عندما لا أكون منشغلاً بالبرمجة، يمكنك أن تجدني أستكشف تقنيات جديدة، أو أساهم في مشاريع مفتوحة المصدر، أو أنشئ محتوى تعليمي لمجتمع المطورين.",
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
