import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryCard from '../components/CategoryCard';
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
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

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
        name: cat.name,
        nameAr: cat.name_ar || cat.name,
        slug: cat.slug,
        description: cat.description || '',
        descriptionAr: cat.description_ar || cat.description || '',
        color: cat.color || 'blue',
        icon: cat.icon || 'BookOpen',
        postCount: cat.post_count || 0
      }));

      const formattedTags = tagsData.map(tag => ({
        id: tag.id,
        name: tag.name,
        nameAr: tag.name_ar || tag.name,
        slug: tag.slug,
        postCount: tag.post_count || 0
      }));

      setCategories(formattedCategories);
      setTags(formattedTags.slice(0, 30));
    } catch (error) {
      console.error('Error loading categories and tags:', error);
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
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('categories')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {i18n.language === 'ar' 
              ? 'تصفح المقالات حسب الفئات والمواضيع المختلفة'
              : 'Browse articles by categories and topics'}
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {i18n.language === 'ar' ? 'جميع الفئات' : 'All Categories'}
          </h2>
          {categories.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 py-12">
              {i18n.language === 'ar' ? 'لا توجد فئات متاحة' : 'No categories available'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => {
                    console.log('Navigate to category:', category.slug);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('tags')}
          </h2>
          {tags.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              {i18n.language === 'ar' ? 'لا توجد وسوم متاحة' : 'No tags available'}
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => {
                    console.log('Navigate to tag:', tag.slug);
                  }}
                  className="transition-transform hover:scale-105"
                >
                  <TagBadge 
                    tag={i18n.language === 'ar' ? tag.nameAr + ' (' + tag.postCount + ')' : tag.name + ' (' + tag.postCount + ')'} 
                    variant="secondary" 
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
