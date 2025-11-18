import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Mail, Lock, Eye, Database, UserCheck } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {isArabic ? 'آخر تحديث: نوفمبر 2025' : 'Last updated: November 2025'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {isArabic ? (
            <>
              {/* Arabic Content */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                  المقدمة
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نحن في BiDev نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحماية معلوماتك عند استخدام موقعنا الإلكتروني.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-blue-600" />
                  المعلومات التي نجمعها
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">1. المعلومات التي تقدمها طوعاً</h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>عنوان البريد الإلكتروني (عند الاشتراك في النشرة الإخبارية)</li>
                      <li>التعليقات والاستفسارات التي ترسلها إلينا</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2. المعلومات التي يتم جمعها تلقائياً</h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>عنوان IP الخاص بك</li>
                      <li>نوع المتصفح وإصداره</li>
                      <li>الصفحات التي تزورها على موقعنا</li>
                      <li>الوقت والتاريخ الخاص بزيارتك</li>
                      <li>الوقت المستغرق في الصفحات</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  كيف نستخدم معلوماتك
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                  <li>إرسال النشرة الإخبارية (إذا اشتركت)</li>
                  <li>تحسين محتوى الموقع وتجربة المستخدم</li>
                  <li>تحليل استخدام الموقع من خلال Google Analytics</li>
                  <li>عرض الإعلانات ذات الصلة من خلال Google AdSense</li>
                  <li>الرد على استفساراتك ودعم طلباتك</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-blue-600" />
                  ملفات تعريف الارتباط (Cookies)
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                  <li><strong>ملفات تعريف الارتباط الأساسية:</strong> ضرورية لتشغيل الموقع</li>
                  <li><strong>ملفات تعريف الارتباط التحليلية:</strong> Google Analytics لفهم كيفية استخدامك للموقع</li>
                  <li><strong>ملفات تعريف الارتباط الإعلانية:</strong> Google AdSense لعرض إعلانات مخصصة</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">خدمات الطرف الثالث</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>Google Analytics:</strong> نستخدم Google Analytics لتتبع وتحليل حركة المرور على الموقع.</p>
                  <p><strong>Google AdSense:</strong> نعرض إعلانات من خلال Google AdSense.</p>
                  <p><strong>Supabase:</strong> نستخدم Supabase لتخزين المحتوى وإدارة البيانات.</p>
                  <p className="mt-4">
                    تخضع هذه الخدمات لسياسات الخصوصية الخاصة بها. نوصي بمراجعة سياساتهم.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">حقوقك</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">لديك الحق في:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                  <li>الوصول إلى بياناتك الشخصية</li>
                  <li>تصحيح البيانات غير الدقيقة</li>
                  <li>حذف بياناتك</li>
                  <li>إلغاء الاشتراك في النشرة الإخبارية في أي وقت</li>
                  <li>الاعتراض على معالجة بياناتك</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">أمن البيانات</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو الكشف أو التعديل أو التدمير. ومع ذلك، لا يمكن ضمان أمان الإنترنت بنسبة 100٪.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">روابط لمواقع أخرى</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  قد يحتوي موقعنا على روابط لمواقع خارجية. لسنا مسؤولين عن ممارسات الخصوصية أو محتوى هذه المواقع.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التغييرات على سياسة الخصوصية</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ "آخر تحديث".
                </p>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  اتصل بنا
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:
                </p>
                <p className="text-blue-600 dark:text-blue-400 mt-2 font-medium">
                  Email: privacy@bidev.site
                </p>
              </section>
            </>
          ) : (
            <>
              {/* English Content */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                  Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  At BiDev, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-blue-600" />
                  Information We Collect
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">1. Information You Provide</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Email address (when subscribing to newsletter)</li>
                      <li>Comments and inquiries you send to us</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2. Automatically Collected Information</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Your IP address</li>
                      <li>Browser type and version</li>
                      <li>Pages you visit on our site</li>
                      <li>Time and date of your visit</li>
                      <li>Time spent on pages</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Send newsletters (if you subscribed)</li>
                  <li>Improve website content and user experience</li>
                  <li>Analyze site usage through Google Analytics</li>
                  <li>Display relevant advertisements through Google AdSense</li>
                  <li>Respond to your inquiries and support requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-blue-600" />
                  Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use cookies to enhance your experience on our site:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Essential Cookies:</strong> Necessary for the site to function</li>
                  <li><strong>Analytics Cookies:</strong> Google Analytics to understand how you use the site</li>
                  <li><strong>Advertising Cookies:</strong> Google AdSense to display personalized ads</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>Google Analytics:</strong> We use Google Analytics to track and analyze site traffic.</p>
                  <p><strong>Google AdSense:</strong> We display ads through Google AdSense.</p>
                  <p><strong>Supabase:</strong> We use Supabase for content storage and data management.</p>
                  <p className="mt-4">
                    These services are subject to their own privacy policies. We recommend reviewing their policies.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your data</li>
                  <li>Unsubscribe from newsletters at any time</li>
                  <li>Object to processing of your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We implement appropriate security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Links to Other Sites</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our site may contain links to external websites. We are not responsible for the privacy practices or content of these sites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Privacy Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
                </p>
              </section>

              <section className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have any questions about this privacy policy, please contact us at:
                </p>
                <p className="text-blue-600 dark:text-blue-400 mt-2 font-medium">
                  Email: privacy@bidev.site
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
