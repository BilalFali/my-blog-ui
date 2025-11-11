// Google AdSense Configuration
export const ADSENSE_CONFIG = {
  // Replace with your actual AdSense publisher ID
  // Get it from: https://www.google.com/adsense/
  publisherId: 'ca-pub-4484945899626696',
  
  // Ad slots for different placements
  // Create these in your AdSense dashboard
  adSlots: {
    headerBanner: '1234567890',      // Top banner ad
    sidebarAd: '0987654321',         // Sidebar ad
    inArticleAd: '1122334455',       // In-article ad
    footerBanner: '5544332211',      // Footer banner
    feedAd: '6677889900',            // In-feed ad (between posts)
  },
  
  // Ad formats
  formats: {
    responsive: 'auto',
    rectangle: 'rectangle',
    horizontal: 'horizontal',
    vertical: 'vertical',
  },
  
  // Enable test mode (shows test ads, useful for development)
  testMode: true, // Set to false in production
};

// Helper function to check if ads should be loaded
export const shouldLoadAds = (): boolean => {
  // Don't load ads in development unless explicitly enabled
  if (import.meta.env.DEV && !ADSENSE_CONFIG.testMode) {
    return false;
  }
  return true;
};
