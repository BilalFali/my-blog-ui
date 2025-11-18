import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, Eye, Folder, Tag as TagIcon, ArrowRight, Code2, Smartphone, Palette, Zap, Database, Cpu, Layers } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../components/ArticleCard';
import AdBanner from '../components/AdBanner';
import TagBadge from '../components/TagBadge';
import HomePageSkeleton from '../components/HomePageSkeleton';
import { blogApi, categoriesApi, tagsApi, type Post, type Category, type Tag } from '../services/api';

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
  const navigate = useNavigate();
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const isArabic = i18n.language === 'ar';
        const [featuredPosts, latestPosts, recentPosts, categoriesData, tagsData] = await Promise.all([
          blogApi.getFeaturedPosts(3),
          blogApi.getPosts(1, 100), // Fetch all articles (increased from 6)
          blogApi.getRecentPosts(10),
          categoriesApi.getAll(),
          tagsApi.getAll(),
        ]);

        setFeaturedArticles(featuredPosts.map(p => convertPostToArticle(p, isArabic)));
        setLatestArticles(latestPosts.data.map(p => convertPostToArticle(p, isArabic)));
        setRecentArticles(recentPosts.map(p => convertPostToArticle(p, isArabic)));
        setCategories(categoriesData);
        setTags(tagsData.slice(0, 12));
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [i18n.language]);

  const getCategoryIcon = (category: Category, index: number) => {
    const iconClasses = "w-7 h-7";
    const gradients = [
      { from: 'from-blue-500', to: 'to-cyan-500', icon: <Smartphone className={iconClasses} /> },
      { from: 'from-purple-500', to: 'to-pink-500', icon: <Palette className={iconClasses} /> },
      { from: 'from-orange-500', to: 'to-red-500', icon: <Zap className={iconClasses} /> },
      { from: 'from-green-500', to: 'to-emerald-500', icon: <Database className={iconClasses} /> },
      { from: 'from-indigo-500', to: 'to-blue-500', icon: <Cpu className={iconClasses} /> },
      { from: 'from-rose-500', to: 'to-pink-500', icon: <Layers className={iconClasses} /> },
    ];

    const gradient = gradients[index % gradients.length];

    return (
      <button
        key={category.id}
        onClick={() => navigate('/category/' + category.slug)}
        className="group bg-white dark:bg-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 dark:hover:from-gray-600 dark:hover:to-gray-600 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-600 transform hover:-translate-y-1 cursor-pointer"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`p-4 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {gradient.icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors text-sm md:text-base">
              {i18n.language === 'ar' ? category.name_ar : category.name_en}
            </h3>
          </div>
        </div>
      </button>
    );
  };

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Simple Hero Section */}
      <section className="py-12 px-4 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {i18n.language === 'ar' ? 'BiDev - مدونة تطوير Flutter' : 'BiDev - Flutter Development Blog'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {i18n.language === 'ar' 
              ? 'مقالات تعليمية شاملة حول Flutter و Dart لبناء تطبيقات متعددة المنصات'
              : 'Comprehensive tutorials about Flutter & Dart for building cross-platform applications'}
          </p>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section id="latest" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {i18n.language === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {i18n.language === 'ar' ? 'تصفح حسب الموضوع' : 'Browse by Topic'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {i18n.language === 'ar' ? 'اختر الموضوع الذي يهمك' : 'Explore Flutter development topics'}
                </p>
              </div>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {i18n.language === 'ar' ? 'لا توجد فئات' : 'No categories available'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {getCategoryIcon(categories[0], 0)}
                {categories.slice(1, 6).map((category, index) => getCategoryIcon(category, index + 1))}
              </div>
              
              {categories.length > 6 && (
                <div className="text-center mt-8">
                  <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    {i18n.language === 'ar' ? 'عرض جميع المواضيع' : 'View All Topics'}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    {i18n.language === 'ar' 
                      ? `${categories.length} موضوع متاح` 
                      : `${categories.length} topics available`}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {i18n.language === 'ar' ? 'المقالات المميزة' : 'Featured Articles'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {i18n.language === 'ar' ? 'أفضل مقالات Flutter المختارة' : 'Top Flutter articles handpicked for you'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner slot="feedAd" format="horizontal" className="h-24 md:h-32" />
        </div>
      </section>

      <section id="latest" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {i18n.language === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {i18n.language === 'ar' ? 'آخر مقالات Flutter المنشورة' : 'Recently published Flutter articles'}
                </p>
              </div>
            </div>
            <Link
              to="/articles"
              className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group transition-colors duration-300"
            >
              {i18n.language === 'ar' ? 'عرض الكل' : 'View All'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {latestArticles.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <p className="text-gray-600 dark:text-gray-400">
                {i18n.language === 'ar' ? 'لا توجد مقالات حاليا' : 'No articles available yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {i18n.language === 'ar' ? 'الأكثر مشاهدة' : 'Most Popular'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {i18n.language === 'ar' ? 'المقالات الأكثر شعبية هذا الأسبوع' : 'Top Flutter articles this week'}
                    </p>
                  </div>
                </div>
              </div>

              {recentArticles.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-gray-600 dark:text-gray-400">
                    {i18n.language === 'ar' ? 'لا توجد مقالات' : 'No articles'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}

              <div className="mt-8">
                <AdBanner slot="inArticleAd" format="horizontal" className="h-32" />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <TagIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {i18n.language === 'ar' ? 'مواضيع شائعة' : 'Popular Topics'}
                    </h3>
                  </div>
                  
                  {tags.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {i18n.language === 'ar' ? 'لا توجد وسوم' : 'No tags'}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => navigate('/tag/' + tag.slug)}
                          className="transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <TagBadge 
                            tag={i18n.language === 'ar' ? tag.name_ar : tag.name_en} 
                            variant="primary" 
                            size="sm" 
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <AdBanner slot="sidebarAd" format="vertical" className="h-96" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
