import React from 'react';

const HomePageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl">
            {/* Title skeleton */}
            <div className="h-12 md:h-16 bg-white/20 rounded-lg w-3/4 mb-6"></div>
            <div className="h-12 md:h-16 bg-white/20 rounded-lg w-1/2 mb-8"></div>
            
            {/* Description skeleton */}
            <div className="h-6 bg-white/15 rounded-lg w-2/3 mb-4"></div>
            <div className="h-6 bg-white/15 rounded-lg w-1/2 mb-10"></div>
            
            {/* Button skeleton */}
            <div className="h-14 bg-white/20 rounded-xl w-48"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-48"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-32"></div>
          </div>
          
          {/* Featured Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* Image skeleton */}
                <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800"></div>
                
                <div className="p-6">
                  {/* Category badge skeleton */}
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24 mb-3"></div>
                  
                  {/* Title skeleton */}
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4"></div>
                  
                  {/* Excerpt skeleton */}
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  
                  {/* Meta skeleton */}
                  <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-56 mb-8"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-full mx-auto mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts Section */}
        <div>
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-48 mb-8"></div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex gap-6">
                  {/* Image skeleton */}
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-lg flex-shrink-0"></div>
                  
                  <div className="flex-1">
                    {/* Badge */}
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20 mb-3"></div>
                    
                    {/* Title */}
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                    
                    {/* Excerpt */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4"></div>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
