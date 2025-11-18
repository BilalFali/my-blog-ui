import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Smartphone, Boxes, Flame, Sparkles, Database, Layout, Code2, Layers } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../components/ArticleCard';
import HomePageSkeleton from '../components/HomePageSkeleton';
import { blogApi, categoriesApi, type Post, type Category } from '../services/api';

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

const HomePage: React.FC = () => {
  const { i18n } = useTranslation();
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for categories
  const getCategoryIcon = (slug: string) => {
    const iconMap: { [key: string]: { icon: React.ElementType; color: string; bgColor: string } } = {
      'flutter': { icon: Smartphone, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
      'widgets': { icon: Boxes, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
      'state-management': { icon: Layers, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20' },
      'firebase': { icon: Flame, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
      'animations': { icon: Sparkles, color: 'text-pink-600 dark:text-pink-400', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
      'database': { icon: Database, color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20' },
      'ui-ux': { icon: Layout, color: 'text-indigo-600 dark:text-indigo-400', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    };

    return iconMap[slug] || { icon: Code2, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-50 dark:bg-gray-800' };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const isArabic = i18n.language === 'ar';
        const [latestPosts, categoriesData] = await Promise.all([
          blogApi.getPosts(1, 100),
          categoriesApi.getAll(),
        ]);

        setLatestArticles(latestPosts.data.map(p => convertPostToArticle(p, isArabic)));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [i18n.language]);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Modern Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
              {i18n.language === 'ar' ? '🚀 مدونة تطوير Flutter' : '🚀 Flutter Development'}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {i18n.language === 'ar' ? 'تعلم Flutter بطريقة احترافية' : 'Learn Flutter The Right Way'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {i18n.language === 'ar' 
                ? 'مقالات تعليمية شاملة ومتعمقة حول تطوير تطبيقات Flutter متعددة المنصات'
                : 'In-depth tutorials and guides for building beautiful cross-platform applications with Flutter'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/articles"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
              >
                {i18n.language === 'ar' ? 'تصفح المقالات' : 'Browse Articles'}
              </Link>
              <Link
                to="/categories"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                {i18n.language === 'ar' ? 'استكشف المواضيع' : 'Explore Topics'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Categories Section */}
      {categories.length > 0 && (
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {i18n.language === 'ar' ? 'تصفح حسب الموضوع' : 'Browse by Topic'}
              </h2>
              {categories.length > 6 && (
                <Link
                  to="/categories"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {i18n.language === 'ar' ? 'عرض الكل' : 'View All'}
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map(category => {
                const { icon: Icon, color, bgColor } = getCategoryIcon(category.slug);
                return (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="group p-4 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {i18n.language === 'ar' ? category.name_ar : category.name_en}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {i18n.language === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
            </h2>
            <Link
              to="/articles"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {i18n.language === 'ar' ? 'عرض الكل' : 'View All'}
            </Link>
          </div>
          
          {latestArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {i18n.language === 'ar' ? 'لا توجد مقالات متاحة' : 'No articles available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
