import React from 'react';

const ArticleSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Hero Image Skeleton */}
      <div className="relative h-96 md:h-[500px] w-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Skeleton */}
        <article className="relative -mt-32">
          {/* Article Header Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 mb-8">
            {/* Category Badge Skeleton */}
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-6"></div>

            {/* Title Skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/5"></div>
            </div>

            {/* Meta Info Skeleton */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="mt-6">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Article Content Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 mb-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              
              <div className="pt-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              
              <div className="pt-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>

          {/* Share Section Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="flex flex-wrap gap-3">
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
