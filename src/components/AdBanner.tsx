import React from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  // Placeholder for Google AdSense
  // In production, you'll add the actual AdSense script
  // slot and format props can be used when integrating real AdSense
  
  return (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center ${className}`}>
      <div className="text-center p-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Advertisement</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Google AdSense Placeholder</p>
      </div>
    </div>
  );
};

export default AdBanner;
