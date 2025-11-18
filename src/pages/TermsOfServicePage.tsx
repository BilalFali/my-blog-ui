import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, AlertCircle, CheckCircle, XCircle, Scale } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
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
                  <Scale className="w-6 h-6 text-purple-600" />
                  مقدمة
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  مرحباً بك في BiDev. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بشروط الخدمة هذه. يرجى قراءتها بعناية قبل استخدام الموقع.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  الموافقة على الشروط
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  باستخدام موقع BiDev، فإنك تقر وتوافق على:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                  <li>أنك تبلغ من العمر 13 عاماً على الأقل</li>
                  <li>أنك تستخدم الموقع بطريقة قانونية ومسؤولة</li>
                  <li>أنك قرأت وفهمت هذه الشروط</li>
                  <li>أنك توافق على الالتزام بجميع القوانين المعمول بها</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">استخدام الموقع</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">الاستخدامات المسموح بها:</h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>قراءة ومشاركة المحتوى التعليمي</li>
                      <li>الاشتراك في النشرة الإخبارية</li>
                      <li>ترك تعليقات بناءة ومحترمة</li>
                      <li>استخدام الموقع لأغراض شخصية وتعليمية</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      الاستخدامات المحظورة:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>نسخ أو نشر المحتوى دون إذن</li>
                      <li>استخدام الموقع لأغراض غير قانونية</li>
                      <li>محاولة اختراق أو تعطيل الموقع</li>
                      <li>نشر محتوى مسيء أو ضار</li>
                      <li>انتحال شخصية الآخرين</li>
                      <li>إرسال رسائل بريد إلكتروني عشوائية (spam)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الملكية الفكرية</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    جميع المحتويات على موقع BiDev، بما في ذلك النصوص والصور والرسومات والشعارات والأكواد البرمجية، هي ملك لـ BiDev ومحمية بموجب قوانين حقوق النشر الدولية.
                  </p>
                  <p className="font-semibold">يمكنك:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>عرض وطباعة المحتوى للاستخدام الشخصي</li>
                    <li>مشاركة روابط المقالات على وسائل التواصل الاجتماعي</li>
                  </ul>
                  <p className="font-semibold">لا يمكنك:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>نسخ المحتوى ونشره على موقعك دون إذن</li>
                    <li>تعديل أو إنشاء أعمال مشتقة</li>
                    <li>استخدام المحتوى لأغراض تجارية دون ترخيص</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المحتوى الذي ينشئه المستخدم</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  إذا قمت بنشر تعليقات أو محتوى على الموقع، فإنك:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                  <li>تمنحنا ترخيصاً لاستخدام ونشر المحتوى الخاص بك</li>
                  <li>تؤكد أن المحتوى لا ينتهك حقوق الآخرين</li>
                  <li>تتحمل المسؤولية الكاملة عن المحتوى الذي تنشره</li>
                  <li>توافق على عدم نشر محتوى مسيء أو غير قانوني</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الإعلانات والروابط</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    نستخدم Google AdSense لعرض الإعلانات على الموقع. هذه الإعلانات قد تستخدم ملفات تعريف الارتباط لعرض إعلانات مخصصة.
                  </p>
                  <p>
                    قد يحتوي الموقع على روابط لمواقع خارجية. لسنا مسؤولين عن محتوى أو سياسات الخصوصية لهذه المواقع.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  إخلاء المسؤولية
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">يتم توفير الموقع "كما هو" دون أي ضمانات:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>لا نضمن دقة أو اكتمال المحتوى</li>
                    <li>لا نضمن أن الموقع سيكون متاحاً دائماً</li>
                    <li>لا نضمن خلو الموقع من الأخطاء أو الفيروسات</li>
                    <li>المحتوى التعليمي للأغراض التعليمية فقط</li>
                  </ul>
                  <p className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                    <strong>تنبيه:</strong> استخدامك للمعلومات والأكواد البرمجية على مسؤوليتك الخاصة. نوصي دائماً بمراجعة واختبار الأكواد قبل استخدامها في الإنتاج.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">تحديد المسؤولية</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية تنشأ عن استخدامك للموقع، بما في ذلك على سبيل المثال لا الحصر:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4 mt-3">
                  <li>فقدان البيانات أو الأرباح</li>
                  <li>انقطاع الأعمال</li>
                  <li>أخطاء في الأكواد البرمجية</li>
                  <li>مشاكل ناتجة عن استخدام المحتوى</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التعويض</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  أنت توافق على تعويض BiDev وحمايتنا من أي مطالبات أو خسائر تنشأ عن:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4 mt-3">
                  <li>انتهاكك لهذه الشروط</li>
                  <li>انتهاكك لحقوق الآخرين</li>
                  <li>المحتوى الذي تنشره على الموقع</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التعديلات على الشروط</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة. استمرارك في استخدام الموقع بعد التغييرات يعني قبولك للشروط الجديدة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">إنهاء الخدمة</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نحتفظ بالحق في تعليق أو إنهاء وصولك إلى الموقع في أي وقت دون إشعار مسبق، خاصة في حالة انتهاك هذه الشروط.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">القانون المعمول به</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  تخضع هذه الشروط وتفسر وفقاً للقوانين المعمول بها. أي نزاع ينشأ عن هذه الشروط سيتم حله في المحاكم المختصة.
                </p>
              </section>

              <section className="bg-purple-50 dark:bg-gray-700 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">اتصل بنا</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  إذا كان لديك أي أسئلة حول شروط الخدمة، يرجى الاتصال بنا على:
                </p>
                <p className="text-purple-600 dark:text-purple-400 mt-2 font-medium">
                  Email: legal@bidev.site
                </p>
              </section>
            </>
          ) : (
            <>
              {/* English Content */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-purple-600" />
                  Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Welcome to BiDev. By using this website, you agree to comply with these Terms of Service. Please read them carefully before using the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  By using BiDev website, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>You are at least 13 years old</li>
                  <li>You use the site legally and responsibly</li>
                  <li>You have read and understood these terms</li>
                  <li>You agree to comply with all applicable laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Use of the Site</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Permitted Uses:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Reading and sharing educational content</li>
                      <li>Subscribing to newsletters</li>
                      <li>Leaving constructive and respectful comments</li>
                      <li>Using the site for personal and educational purposes</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      Prohibited Uses:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Copying or republishing content without permission</li>
                      <li>Using the site for illegal purposes</li>
                      <li>Attempting to hack or disrupt the site</li>
                      <li>Publishing offensive or harmful content</li>
                      <li>Impersonating others</li>
                      <li>Sending spam or unsolicited emails</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    All content on BiDev, including text, images, graphics, logos, and code, is owned by BiDev and protected by international copyright laws.
                  </p>
                  <p className="font-semibold">You may:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>View and print content for personal use</li>
                    <li>Share article links on social media</li>
                  </ul>
                  <p className="font-semibold">You may not:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Copy and republish content on your site without permission</li>
                    <li>Modify or create derivative works</li>
                    <li>Use content for commercial purposes without license</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User-Generated Content</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  If you post comments or content on the site, you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Grant us a license to use and publish your content</li>
                  <li>Confirm that the content does not violate others' rights</li>
                  <li>Take full responsibility for the content you post</li>
                  <li>Agree not to post offensive or illegal content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advertisements and Links</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We use Google AdSense to display advertisements on the site. These ads may use cookies to show personalized ads.
                  </p>
                  <p>
                    The site may contain links to external websites. We are not responsible for the content or privacy policies of these sites.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  Disclaimer
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">The site is provided "as is" without any warranties:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We do not guarantee the accuracy or completeness of content</li>
                    <li>We do not guarantee the site will always be available</li>
                    <li>We do not guarantee the site is error-free or virus-free</li>
                    <li>Educational content is for educational purposes only</li>
                  </ul>
                  <p className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                    <strong>Warning:</strong> Use of information and code at your own risk. We always recommend reviewing and testing code before using it in production.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We will not be liable for any direct, indirect, or incidental damages arising from your use of the site, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                  <li>Loss of data or profits</li>
                  <li>Business interruption</li>
                  <li>Errors in code</li>
                  <li>Problems resulting from content use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Indemnification</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You agree to indemnify and hold BiDev harmless from any claims or losses arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                  <li>Your violation of these terms</li>
                  <li>Your violation of others' rights</li>
                  <li>Content you post on the site</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Modifications to Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We reserve the right to modify these terms at any time. Any changes will be posted on this page. Your continued use of the site after changes means you accept the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We reserve the right to suspend or terminate your access to the site at any time without notice, especially in case of violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  These terms are governed by and construed in accordance with applicable laws. Any disputes arising from these terms will be resolved in competent courts.
                </p>
              </section>

              <section className="bg-purple-50 dark:bg-gray-700 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-purple-600 dark:text-purple-400 mt-2 font-medium">
                  Email: legal@bidev.site
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
