import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Folder, Search, Filter } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../components/ArticleCard';
import Loader from '../components/Loader';
import { blogApi, type Post } from '../services/api';

const CategoryArticlesPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [articles, setArticles] = useState<Article[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const result = await blogApi.getPosts(1, 100, slug);
        
        // Get category info from first post or fetch separately
        if (result.data.length > 0 && result.data[0].category) {
          setCategoryName(isArabic ? result.data[0].category.name_ar : result.data[0].category.name_en);
          setCategoryDescription(isArabic ? result.data[0].category.description_ar : result.data[0].category.description_en);
        }

        // Convert posts to articles
        const articlesData: Article[] = result.data.map((post: Post) => ({
          id: post.id,
          slug: post.slug,
          title: isArabic ? post.title_ar : post.title_en,
          excerpt: (isArabic ? post.excerpt_ar : post.excerpt_en) || '',
          image: post.featured_image || '',
          featuredImage: post.featured_image || '',
          category: (isArabic ? post.category?.name_ar : post.category?.name_en) || 'Uncategorized',
          categorySlug: post.category?.slug || '',
          date: post.created_at,
          readTime: Math.ceil((isArabic ? post.content_ar : post.content_en).split(' ').length / 200),
          tags: post.tags?.map((t: { name_ar: string; name_en: string }) => isArabic ? t.name_ar : t.name_en) || [],
          language: isArabic ? 'ar' : 'en'
        }));

        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching category articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryArticles();
  }, [slug, isArabic]);

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.readTime - a.readTime; // Using readTime as a proxy for now
        default:
          return 0;
      }
    });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/categories" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t('backToCategories') || 'Back to Categories'}</span>
          </Link>

          <div className="flex items-start gap-4 mt-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Folder className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {categoryName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {categoryDescription}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {filteredArticles.length} {filteredArticles.length === 1 ? (t('article') || 'article') : (t('articles') || 'articles')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchArticles') || 'Search articles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
                className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="newest">{t('newest') || 'Newest First'}</option>
                <option value="oldest">{t('oldest') || 'Oldest First'}</option>
                <option value="popular">{t('popular') || 'Most Popular'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('noArticlesFound') || 'No articles found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery 
                ? (t('tryDifferentSearch') || 'Try a different search query')
                : (t('noArticlesInCategory') || 'No articles in this category yet')
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryArticlesPage;
