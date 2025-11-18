import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OptimizedImage from './OptimizedImage';

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
    <article className="group">
      <Link to={`/article/${article.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg mb-3 aspect-[16/9] bg-gray-100 dark:bg-gray-800">
          <OptimizedImage
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>
      
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>{new Date(article.date).toLocaleDateString(t('language') === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>{article.readTime} min read</span>
        </div>

        <Link to={`/article/${article.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;
