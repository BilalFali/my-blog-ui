import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Folder, Tag as TagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { categoriesApi, tagsApi } from '../services/api';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  postCount: number;
}

interface Tag {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  postCount: number;
}

const CategoriesPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [categoriesData, tagsData] = await Promise.all([
        categoriesApi.getAll(),
        tagsApi.getAll()
      ]);

      const formattedCategories = categoriesData.map(cat => ({
        id: cat.id,
        name: cat.name_en,
        nameAr: cat.name_ar || cat.name_en,
        slug: cat.slug,
        description: cat.description_en || '',
        descriptionAr: cat.description_ar || cat.description_en || '',
        postCount: cat.post_count || 0
      }));

      const formattedTags = tagsData.map(tag => ({
        id: tag.id,
        name: tag.name_en,
        nameAr: tag.name_ar || tag.name_en,
        slug: tag.slug,
        postCount: tag.post_count || 0
      }));

      setCategories(formattedCategories);
      setTags(formattedTags);
    } catch (error) {
      console.error('Error loading categories and tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(cat =>
    searchQuery === '' ||
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.nameAr.includes(searchQuery)
  );

  const filteredTags = tags.filter(tag =>
    searchQuery === '' ||
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.nameAr.includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? 'جميع الفئات' : 'Browse by Category'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isArabic
              ? 'اكتشف المقالات المنظمة حسب المواضيع'
              : 'Explore articles organized by topics'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={isArabic ? 'ابحث عن الفئات...' : 'Search categories...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Folder className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            {isArabic ? 'جميع الفئات' : 'All Categories'}
          </h2>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {isArabic ? 'لا توجد نتائج' : 'No categories found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                      <Folder className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
                      {category.postCount || 0} {category.postCount === 1 ? (isArabic ? 'مقال' : 'article') : (isArabic ? 'مقالات' : 'articles')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {isArabic ? category.nameAr : category.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {isArabic ? category.descriptionAr : category.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <TagIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            {isArabic ? 'جميع الوسوم' : 'Popular Tags'}
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {filteredTags.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {isArabic ? 'لا توجد نتائج' : 'No tags found'}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {filteredTags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.slug}`}
                    className="group"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 rounded-lg transition-all font-medium">
                      {isArabic ? tag.nameAr : tag.name}
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        ({tag.postCount || 0})
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
