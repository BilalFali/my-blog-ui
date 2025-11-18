import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Search, SlidersHorizontal } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../components/ArticleCard';
import ArticleListSkeleton from '../components/ArticleListSkeleton';
import { blogApi, type Post } from '../services/api';

const convertPostToArticle = (post: Post, isArabic: boolean): Article => ({
  id: post.id,
  title: isArabic ? post.title_ar : post.title_en,
  excerpt: isArabic 
    ? ((post.excerpt_ar || post.content_ar).substring(0, 150) + '...') 
    : ((post.excerpt_en || post.content_en).substring(0, 150) + '...'),
  image: post.cover_image || post.featured_image || 'https://picsum.photos/seed/' + post.id + '/800/400',
  date: post.created_at,
  readTime: Math.ceil((isArabic ? post.content_ar : post.content_en).split(' ').length / 200),
  tags: post.tags?.map(t => isArabic ? t.name_ar : t.name_en) || [],
  language: isArabic ? 'ar' : 'en',
  slug: post.slug,
});

const AllArticlesPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 100; // Increased to fetch more articles per page

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const result = await blogApi.getPosts(page, perPage);
        const convertedArticles = result.data.map(p => convertPostToArticle(p, isArabic));
        
        // Sort articles
        const sorted = sortBy === 'latest' 
          ? convertedArticles 
          : [...convertedArticles].reverse();
        
        setArticles(sorted);
        setTotalPages(Math.ceil(result.total / perPage));
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [page, isArabic, sortBy]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <ArticleListSkeleton iconColor="blue" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {isArabic ? 'جميع المقالات' : 'All Articles'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {isArabic 
                  ? `اكتشف ${articles.length} مقالة حول Flutter و Dart` 
                  : `Discover ${articles.length} articles about Flutter & Dart`}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={isArabic ? 'ابحث في المقالات...' : 'Search articles...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
              className="pl-12 pr-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white appearance-none cursor-pointer"
            >
              <option value="latest">{isArabic ? 'الأحدث أولاً' : 'Latest First'}</option>
              <option value="oldest">{isArabic ? 'الأقدم أولاً' : 'Oldest First'}</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {isArabic 
                ? `تم العثور على ${filteredArticles.length} مقالة` 
                : `Found ${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'لا توجد مقالات' : 'No articles found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm 
                ? (isArabic ? 'جرب مصطلح بحث آخر' : 'Try a different search term')
                : (isArabic ? 'لم يتم نشر أي مقالات بعد' : 'No articles have been published yet')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && !searchTerm && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {isArabic ? 'السابق' : 'Previous'}
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          page === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {isArabic ? 'التالي' : 'Next'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllArticlesPage;
