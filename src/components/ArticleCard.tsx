import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock } from 'lucide-react';
import TagBadge from './TagBadge';

export interface Article {
  id: number | string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
  tags: string[];
  language: 'en' | 'ar';
  slug: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { t } = useTranslation();

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link to={`/article/${article.slug}`}>
        <div className="relative overflow-hidden h-48">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <TagBadge tag={article.language.toUpperCase()} variant="accent" />
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString(t('language') === 'ar' ? 'ar-SA' : 'en-US')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime} {t('minuteRead')}
          </span>
        </div>

        <Link to={`/article/${article.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <TagBadge key={index} tag={tag} variant="secondary" />
          ))}
        </div>

        <Link
          to={`/article/${article.slug}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          {t('readMore')} →
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
