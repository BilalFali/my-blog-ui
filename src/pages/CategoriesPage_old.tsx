import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Smartphone, Palette, Zap, Database, Cpu, Layers, Folder, Search, TrendingUp, ArrowRight } from 'lucide-react';
import TagBadge from '../components/TagBadge';
import Loader from '../components/Loader';
import { categoriesApi, tagsApi } from '../services/api';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  color: string;
  icon: string;
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
        color: cat.color || 'blue',
        icon: cat.icon || 'BookOpen',
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

  const getCategoryIcon = (index: number) => {
    const icons = [
      <Smartphone className="w-8 h-8" />,
      <Palette className="w-8 h-8" />,
      <Zap className="w-8 h-8" />,
      <Database className="w-8 h-8" />,
      <Cpu className="w-8 h-8" />,
      <Layers className="w-8 h-8" />,
    ];
    return icons[index % icons.length];
  };

  const getCategoryGradient = (index: number) => {
    const gradients = [
      { from: 'from-blue-500', to: 'to-cyan-500', hover: 'hover:from-blue-600 hover:to-cyan-600' },
      { from: 'from-purple-500', to: 'to-pink-500', hover: 'hover:from-purple-600 hover:to-pink-600' },
      { from: 'from-orange-500', to: 'to-red-500', hover: 'hover:from-orange-600 hover:to-red-600' },
      { from: 'from-green-500', to: 'to-emerald-500', hover: 'hover:from-green-600 hover:to-emerald-600' },
      { from: 'from-indigo-500', to: 'to-blue-500', hover: 'hover:from-indigo-600 hover:to-blue-600' },
      { from: 'from-rose-500', to: 'to-pink-500', hover: 'hover:from-rose-600 hover:to-pink-600' },
    ];
    return gradients[index % gradients.length];
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Folder className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">
              {i18n.language === 'ar' ? 'استكشف المواضيع' : 'Explore Topics'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {i18n.language === 'ar' ? 'جميع الفئات' : 'All Categories'}
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {i18n.language === 'ar' 
              ? 'اكتشف مقالات Flutter المنظمة حسب الموضوع - من الأساسيات إلى المواضيع المتقدمة'
              : 'Discover Flutter articles organized by topic - from basics to advanced concepts'}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={i18n.language === 'ar' ? 'ابحث عن الفئات أو الوسوم...' : 'Search categories or tags...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {i18n.language === 'ar' ? 'المواضيع الرئيسية' : 'Main Topics'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {i18n.language === 'ar' 
                  ? `${filteredCategories.length} فئة متاحة` 
                  : `${filteredCategories.length} categories available`}
              </p>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
              <p className="text-gray-600 dark:text-gray-400">
                {i18n.language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => {
                const gradient = getCategoryGradient(index);
                return (
                  <button
                    key={category.id}
                    onClick={() => window.location.href = '/category/' + category.slug}
                    className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 transform hover:-translate-y-2 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-4 bg-gradient-to-br ${gradient.from} ${gradient.to} ${gradient.hover} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        {getCategoryIcon(index)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                          {i18n.language === 'ar' ? category.nameAr : category.name}
                        </h3>
                        
                        {(category.description || category.descriptionAr) && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {i18n.language === 'ar' ? category.descriptionAr : category.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {category.postCount} {i18n.language === 'ar' ? 'مقال' : 'articles'}
                          </span>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {i18n.language === 'ar' ? 'جميع الوسوم' : 'All Tags'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {i18n.language === 'ar' 
                  ? `${filteredTags.length} وسم متاح` 
                  : `${filteredTags.length} tags available`}
              </p>
            </div>
          </div>

          {filteredTags.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {i18n.language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {filteredTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => window.location.href = '/tag/' + tag.slug}
                  className="transition-all hover:scale-105 hover:-translate-y-1"
                >
                  <TagBadge 
                    tag={`${i18n.language === 'ar' ? tag.nameAr : tag.name} (${tag.postCount})`}
                    variant="primary" 
                    size="md" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
