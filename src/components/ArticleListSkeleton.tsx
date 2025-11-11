import React from 'react';

interface ArticleListSkeletonProps {
  iconColor?: 'blue' | 'purple';
}

const ArticleListSkeleton: React.FC<ArticleListSkeletonProps> = ({ iconColor = 'blue' }) => {
  const gradientClass = iconColor === 'blue' 
    ? 'from-blue-500 to-purple-600' 
    : 'from-purple-500 to-pink-600';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back button */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mb-4"></div>

          <div className="flex items-start gap-4 mt-4">
            {/* Icon */}
            <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl`}></div>
            
            <div className="flex-1">
              {/* Title */}
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mb-2"></div>
              
              {/* Description */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/5 mb-2"></div>
              
              {/* Count */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="h-11 bg-gray-100 dark:bg-gray-900 rounded-lg"></div>
            </div>
            {/* Sort */}
            <div className="h-11 bg-gray-100 dark:bg-gray-900 rounded-lg w-48"></div>
          </div>
        </div>

        {/* Articles Grid */}
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
    </div>
  );
};

export default ArticleListSkeleton;
