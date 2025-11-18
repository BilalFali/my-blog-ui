import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Check, Share2, MessageCircle, Send } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description = '', className = '' }) => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const isArabic = i18n.language === 'ar';

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];
    
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      onClick: () => handleShare('facebook'),
      className: 'bg-blue-600 hover:bg-blue-700',
      ariaLabel: isArabic ? 'مشاركة على فيسبوك' : 'Share on Facebook',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      onClick: () => handleShare('twitter'),
      className: 'bg-sky-500 hover:bg-sky-600',
      ariaLabel: isArabic ? 'مشاركة على تويتر' : 'Share on Twitter',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      onClick: () => handleShare('linkedin'),
      className: 'bg-blue-700 hover:bg-blue-800',
      ariaLabel: isArabic ? 'مشاركة على لينكد إن' : 'Share on LinkedIn',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      onClick: () => handleShare('whatsapp'),
      className: 'bg-green-600 hover:bg-green-700',
      ariaLabel: isArabic ? 'مشاركة على واتساب' : 'Share on WhatsApp',
    },
    {
      name: 'Telegram',
      icon: Send,
      onClick: () => handleShare('telegram'),
      className: 'bg-blue-500 hover:bg-blue-600',
      ariaLabel: isArabic ? 'مشاركة على تيليجرام' : 'Share on Telegram',
    },
  ];

  return (
    <div className={`${className} ${isArabic ? 'rtl' : ''}`}>
      <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
          <Share2 className="w-5 h-5 text-white" />
        </div>
        {t('shareArticle') || (isArabic ? 'شارك هذا المقال' : 'Share This Article')}
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Social Media Share Buttons */}
        {shareButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.name}
              onClick={button.onClick}
              className={`group flex items-center gap-2 px-5 py-3 ${button.className} text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`}
              aria-label={button.ariaLabel}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{button.name}</span>
            </button>
          );
        })}

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="group flex items-center gap-2 px-5 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          aria-label={isArabic ? 'نسخ الرابط' : 'Copy Link'}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
              <span>{t('copied') || (isArabic ? 'تم النسخ!' : 'Copied!')}</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t('copyLink') || (isArabic ? 'نسخ الرابط' : 'Copy Link')}</span>
            </>
          )}
        </button>

        {/* Native Share Button (mobile) */}
        {typeof window !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            aria-label={isArabic ? 'المزيد من خيارات المشاركة' : 'More share options'}
          >
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{isArabic ? 'المزيد' : 'More'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;
