import React, { useEffect, useRef } from 'react';
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
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    if (shouldLoadAds() && !isAdPushed.current) {
      try {
        // Only push if the ad element exists and hasn't been pushed yet
        if (adRef.current && !adRef.current.hasAttribute('data-ad-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isAdPushed.current = true;
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }

    // Cleanup function to reset the ref when component unmounts
    return () => {
      isAdPushed.current = false;
    };
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
        ref={adRef}
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
