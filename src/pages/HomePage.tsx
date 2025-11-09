import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, TrendingUp, Clock, Eye, Folder, Tag as TagIcon, ArrowRight } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../components/ArticleCard';
import AdBanner from '../components/AdBanner';
import TagBadge from '../components/TagBadge';
import Loader from '../components/Loader';
import { blogApi, categoriesApi, tagsApi, type Post, type Category, type Tag } from '../services/api';

const convertPostToArticle = (post: Post): Article => ({
  id: post.id,
  title: post.title_en,
  excerpt: post.content_en.substring(0, 150) + '...',
  image: 'https://picsum.photos/seed/' + post.id + '/800/400',
  date: new Date(post.created_at).toISOString().split('T')[0],
  readTime: Math.ceil(post.content_en.split(' ').length / 200),
  tags: post.tags?.map(t => t.name_en) || [],
  language: post.language as 'en' | 'ar',
  slug: post.slug,
});

const HomePage: React.FC = () => {
  const { i18n } = useTranslation();
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [featuredPosts, latestPosts, recentPosts, categoriesData, tagsData] = await Promise.all([
        blogApi.getFeaturedPosts(3),
        blogApi.getPosts(1, 6),
        blogApi.getRecentPosts(4),
        categoriesApi.getAll(),
        tagsApi.getAll(),
      ]);

      setFeaturedArticles(featuredPosts.map(convertPostToArticle));
      setLatestArticles(latestPosts.data.map(convertPostToArticle));
      setRecentArticles(recentPosts.map(convertPostToArticle));
      setCategories(categoriesData.slice(0, 8));
      setTags(tagsData.slice(0, 12));
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {i18n.language === 'ar' ? 'مرحبا بك في مدونتي' : 'Welcome to my blog'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {i18n.language === 'ar' ? 'اكتشف عالم البرمجة' : 'Discover the World of'}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {i18n.language === 'ar' ? 'والتطوير' : 'Programming'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {i18n.language === 'ar' 
              ? 'مقالات شاملة عن البرمجة، التطوير، والتقنيات الحديثة'
              : 'Comprehensive articles about programming, development, and modern technologies'}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#latest"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {i18n.language === 'ar' ? 'تصفح المقالات' : 'Browse Articles'}
            </a>
            <a
              href="/categories"
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 transform hover:scale-105"
            >
              {i18n.language === 'ar' ? 'استكشف الفئات' : 'Explore Categories'}
            </a>
          </div>
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
                    {i18n.language === 'ar' ? 'أفضل المقالات المختارة لك' : 'Hand-picked best articles for you'}
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
                  {i18n.language === 'ar' ? 'آخر المقالات المنشورة' : 'Recently published articles'}
                </p>
              </div>
            </div>
            <a
              href="/articles"
              className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group"
            >
              {i18n.language === 'ar' ? 'عرض الكل' : 'View All'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
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
                      {i18n.language === 'ar' ? 'الأكثر مشاهدة' : 'Most Viewed'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {i18n.language === 'ar' ? 'المقالات الأكثر شعبية' : 'Popular articles this week'}
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

              <AdBanner className="mt-8 h-32" />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Folder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {i18n.language === 'ar' ? 'الفئات' : 'Categories'}
                    </h3>
                  </div>
                  
                  {categories.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {i18n.language === 'ar' ? 'لا توجد فئات' : 'No categories'}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {categories.slice(0, 6).map((category) => (
                        <button
                          key={category.id}
                          onClick={() => window.location.href = '/category/' + category.slug}
                          className="w-full text-left px-4 py-3 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg transition-all shadow-sm hover:shadow-md group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {i18n.language === 'ar' ? category.name_ar : category.name_en}
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      ))}
                      {categories.length > 6 && (
                        <a
                          href="/categories"
                          className="block w-full text-center py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                        >
                          {i18n.language === 'ar' ? 'عرض جميع الفئات' : 'View all categories'} →
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <TagIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {i18n.language === 'ar' ? 'الوسوم الشائعة' : 'Popular Tags'}
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
                          onClick={() => window.location.href = '/tag/' + tag.slug}
                          className="transition-transform hover:scale-105"
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

                <AdBanner className="h-96" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {i18n.language === 'ar' ? 'هل تريد معرفة المزيد؟' : 'Want to Learn More?'}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {i18n.language === 'ar' 
              ? 'اشترك في النشرة الإخبارية للحصول على آخر المقالات والتحديثات'
              : 'Subscribe to our newsletter for the latest articles and updates'}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/about"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {i18n.language === 'ar' ? 'من أنا' : 'About Me'}
            </a>
            <a
              href="/categories"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              {i18n.language === 'ar' ? 'تصفح الفئات' : 'Browse Categories'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
