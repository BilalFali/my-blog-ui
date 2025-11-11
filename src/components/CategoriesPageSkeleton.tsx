import React from 'react';

const CategoriesPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md">
            <div className="h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"></div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-48"></div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-3">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-900 dark:to-blue-800 rounded-lg"></div>
                  {/* Count badge */}
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
                </div>

                {/* Title */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-2"></div>

                {/* Description */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div>
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-40"></div>
          </div>

          {/* Tags Container */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                <div 
                  key={i} 
                  className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg" 
                  style={{ width: `${80 + Math.random() * 60}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPageSkeleton;
