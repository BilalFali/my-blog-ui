import React from 'react';
import { useTranslation } from 'react-i18next';
import { Folder } from 'lucide-react';

interface Category {
  id: number | string;
  name?: string;
  nameAr?: string;
  slug?: string;
  description?: string;
  descriptionAr?: string;
  count?: number;
}

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const displayName = isArabic ? (category.nameAr || category.name) : (category.name || category.nameAr);
  const displayDescription = isArabic ? (category.descriptionAr || category.description) : (category.description || category.descriptionAr);

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
          <Folder className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {displayName}
          </h3>
          {(category.description || category.descriptionAr) && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {displayDescription}
            </p>
          )}
          {category.count !== undefined && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {category.count} {isArabic ? 'مقال' : 'articles'}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
