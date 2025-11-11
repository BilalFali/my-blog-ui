import React, { useEffect } from 'react';
import { ADSENSE_CONFIG, shouldLoadAds } from '../config/adsense';

interface AdBannerProps {
  slot?: 'headerBanner' | 'sidebarAd' | 'inArticleAd' | 'footerBanner' | 'feedAd';
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  slot = 'feedAd',
  format = 'auto',
  className = '',
  style = {}
}) => {
  useEffect(() => {
    if (shouldLoadAds()) {
      try {
        // Push ad to Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // If ads shouldn't load, show placeholder
  if (!shouldLoadAds()) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Advertisement</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Ad space (dev mode)</p>
        </div>
      </div>
    );
  }

  const adSlot = ADSENSE_CONFIG.adSlots[slot];

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          ...style
        }}
        data-ad-client={ADSENSE_CONFIG.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
