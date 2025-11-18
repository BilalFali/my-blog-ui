import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Code2, Palette, Smartphone } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const skills = [
    { icon: Smartphone, name: isArabic ? 'تطوير Flutter' : 'Flutter & Dart', color: 'text-blue-600' },
    { icon: Code2, name: isArabic ? 'Firebase & APIs' : 'Firebase & REST APIs', color: 'text-orange-600' },
    { icon: Palette, name: isArabic ? 'تصميم UI/UX' : 'UI/UX Implementation', color: 'text-purple-600' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/BilalFali', label: 'GitHub', color: 'hover:bg-gray-800' },
    { icon: Linkedin, href: 'https://linkedin.com/in/falibilal', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Mail, href: 'mailto:bilalfali60@gmail.com', label: 'Email', color: 'hover:bg-green-600' },
  ];

  const bioEn = {
    intro: "Hi, I'm Bilal 👋",
    paragraph1: "Master of Computer Science graduate and skilled Flutter Mobile Developer with 4+ years of proven experience in designing and developing cross-platform applications for Android and iOS. I craft beautiful & performant mobile applications with Flutter, transforming ideas into seamless user experiences.",
    paragraph2: "I'm proficient in Flutter, Dart, Firebase, Supabase, and modern state management solutions. I have successfully developed and launched multiple mobile apps including VTC (ride-hailing) applications, e-commerce platforms, and various client projects. My expertise includes real-time tracking, secure authentication, Firebase integration, payment gateway implementation, and app store deployment.",
    paragraph3: "When I'm not coding, you can find me exploring new Flutter packages, contributing to the Flutter community, and staying up-to-date with the latest mobile development trends and best practices. Based in M'sila, Algeria, I'm passionate about creating innovative mobile solutions with 100% client satisfaction.",
  };

  const bioAr = {
    intro: "مرحباً، أنا بلال 👋",
    paragraph1: "خريج ماجستير في علوم الكمبيوتر ومطور Flutter محترف مع أكثر من 4 سنوات من الخبرة المثبتة في تصميم وتطوير تطبيقات متعددة المنصات لنظامي Android و iOS. أقوم ببناء تطبيقات جوال جميلة وعالية الأداء باستخدام Flutter، مع تحويل الأفكار إلى تجارب مستخدم سلسة.",
    paragraph2: "أتقن Flutter و Dart و Firebase و Supabase وحلول إدارة الحالة الحديثة. نجحت في تطوير وإطلاق العديد من تطبيقات الجوال بما في ذلك تطبيقات VTC (حجز الرحلات)، منصات التجارة الإلكترونية، ومشاريع متنوعة للعملاء. تشمل خبرتي التتبع في الوقت الفعلي، المصادقة الآمنة، تكامل Firebase، تنفيذ بوابات الدفع، ونشر التطبيقات على المتاجر.",
    paragraph3: "عندما لا أكون منشغلاً بالبرمجة، يمكنك أن تجدني أستكشف حزم Flutter الجديدة، وأساهم في مجتمع Flutter، وأبقى على اطلاع بأحدث اتجاهات وممارسات تطوير تطبيقات الجوال. مقيم في المسيلة، الجزائر، وأنا شغوف بإنشاء حلول جوال مبتكرة مع رضا عملاء 100%.",
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
            <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 flex items-center justify-center">
              <div className="w-48 h-48 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-7xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  B
                </span>
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
